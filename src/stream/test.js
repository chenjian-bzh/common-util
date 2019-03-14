
const Readable = require('stream').Readable;
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

// resume方法将readableFlowing设为true, 流转为flowing状态， 如果没有监听data事件，数据将流失完
(function () {
    const dataSource = {
        data: new Array(20).fill('-'),
        makeData() {
            if (!dataSource.data.length) return null;
            return dataSource.data.pop();
        }
    }

    const readStream = new MyReadable(dataSource);
    //设置了encoding之后，data事件接受的数据将是string形式， 不设置的话接受的是buffer
    readStream.setEncoding('utf-8')

    readStream.resume();

    setTimeout(() => {
        readStream.on('data', (chunk) => {
            console.log('chunk: ', chunk);
        })
    }, 1000);
})();


//调用pause()、unpipe()、遭遇backpressure都会将readableFlowing设为false, 流转为paused状态，继续生产数据知道流内的buffer达到上限， 而不会触发data这样的消费事件
//此时监听data事件也无法改变这个状态； 需要使用resume()方法
(function () {
    const dataSource = {
        data: new Array(20).fill('-'),
        makeData() {
            if (!dataSource.data.length) return null;
            return dataSource.data.pop();
        }
    }

    const readStream = new MyReadable(dataSource);
    readStream.setEncoding('utf-8')

    readStream.pause();

    readStream.on('data', (chunk) => {
        console.log('chunk: ', chunk);
    })
})();