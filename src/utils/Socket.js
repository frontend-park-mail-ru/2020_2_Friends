class Socked {
    constructor (webSocketURL) {
        this.url = webSocketURL;
        this.messageSubscribers = new Set();
        this.socketTimer = null;
    }

    connect () {
        console.log('Try to connect');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            console.log('Already connected');
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = (event) => {
            this.socketTimer = setInterval(() => this.socket.send(''), 10000);
            console.log('Socket connected');
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
        };
    }

    disconnect () {
        console.log('Try to close socket');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.CLOSED || connectionState === WebSocket.CLOSING) {
            console.log('Already closed');
            return;
        }
        this.socket.close();
    }

    subscribe (eventType, handler) {
        switch (eventType) {
        case 'message':
            this.messageSubscribers.add(handler);
            break;
        default:
            break;
        }
    }

    send (data) {
        console.log('send', JSON.stringify(data));
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

const socket = new Socked('ws://89.208.197.247:9000/api/v1/ws');
export default socket.getInstance();
