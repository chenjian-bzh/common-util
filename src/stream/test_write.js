const Writable = require('stream').Writable;

//生产者如果写入速度过快，导致inner buffer写满， 就会出现背压， writable  stream无法再写入，调用write方法返回false， 只有buffer清空之后
//writable stream才会触发drain事件，，通知生产者继续写入
function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 10000;
    write();
    function write() {
        let ok = true;
        while (i-- > 0 && ok) {
            ok = writer.write(data, encoding, i === 0 ? callback : null);
        }
        if (i > 0) {
            // 这里提前停下了，'drain' 事件触发后才可以继续写入  
            console.log('drain', i);
            writer.once('drain', write);
        }
    }
}

const writer = new Writable({
    write(chunk, encoding, callback) {
        // 比 process.nextTick() 稍慢， 降低stream的处理效率， 模拟backpressure
        setTimeout(() => {
            callback && callback();
        });
    }
});

writeOneMillionTimes(writer, 'simple', 'utf8', () => {
    console.log('end');
});
