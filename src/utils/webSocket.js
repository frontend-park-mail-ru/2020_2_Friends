class WebSocket {
    constructor (webSocketURL) {
        this.url = webSocketURL;
        this.messageSubscribers = new Set();
        this.closeSubscribers = new Set();
        this.errorSubscribers = new Set();
        this.socketTimer = null;
    }

    connect () {
        console.log('Trying to connect socket...');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            console.log('Socked is already connected');
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.socketTimer = setInterval(() => this.socket.send(''), 10000);
            console.log('Socket is connected!');
        };
        this.socket.onmessage = (event) => {
            this.messageSubscribers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onclose = (event) => {
            console.log('Socket closed');
            clearInterval(this.socketTimer);
            this.socketTimer = null;

            this.closeSubscribers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onerror = (event) => {
            this.errorSubscribers.forEach((handler) => {
                handler(event);
            });
        };
    }

    disconnect () {
        console.log('trying to disconnect socket...');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.CLOSED || connectionState === WebSocket.CLOSING) {
            console.log('socket is already closed');
            return;
        }
        console.log('closing socked');
        this.socket.close();
    }

    subscribe (event, handler) {
        switch (event) {
        case 'message':
            this.messageSubscribers.add(handler);
            break;
        case 'close':
            this.closeSubscribers.add(handler);
            break;
        case 'error':
            this.errorSubscribers.add(handler);
            break;
        default:
            break;
        }
    }

    send (data) {
        this.socket.send(JSON.stringify(data));
    }

    getInstance () {
        return {
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this),
            subscribe: this.subscribe.bind(this),
            send: this.send.bind(this)
        };
    }
}

const socket = new WebSocket('ws://127.0.0.1:9000/api/v1/chat');
export default socket.getInstance();
