class Socked {
    constructor (url) {
        this.url = url;
        this.messageHandlers = new Set();
        this.socketTimer = null;
    }

    subscribe (event, handler) {
        this.messageHandlers.add(handler);
    }

    send (data) {
        this.socket.send(JSON.stringify(data));
    }

    connect () {
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            console.log('Socked already connected');
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log('Socked connected');
            this.socketTimer = setInterval(() => this.socket.send(''), 10000);
        };
        this.socket.onmessage = (event) => {
            this.messageHandlers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onclose = () => {
            clearInterval(this.socketTimer);
            this.socketTimer = null;
        };
    }

    disconnect () {
        const connectionState = this.socket?.readyState;
        if (connectionState !== WebSocket.CLOSED && connectionState !== WebSocket.CLOSING) {
            this.socket.close();
        }
    }

    getSocket () {
        return {
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this),
            subscribe: this.subscribe.bind(this),
            send: this.send.bind(this)
        };
    }
}

const socket = new Socked('wss://grassnearhome.ru/api/v1/ws');
export default socket.getSocket();
