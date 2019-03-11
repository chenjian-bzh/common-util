class Debug {
    constructor(name) {
        this.name = name;
    }

    info(msg) {
        console.log(`${this.name}: ${msg}`);
    }

    warn(msg) {
        console.warn(`${this.name}: ${msg}`);
    }
}

function createLogger(name) {
    return new Debug(name);
}

export default createLogger;