
const { Readable } = require('stream');

class MyReadable extends Readable {
    constructor(dataSource, options) {
        super(options);
        this.dataSource = dataSource;
    }

    _read() {
        const data = this.dataSource.makeData();
        this.push(data);
    }
}

export const dataSource = {
    data: new Array(20).fill('-'),
    makeData() {
        if (!dataSource.data.length) return null;
        return dataSource.data.pop();
    }
}

export default MyReadable;


