import MyReadable, { dataSource } from './index';

jest.useFakeTimers();


describe('Myreadable', () => {
    test('测试resume方法对data事件的影响', () => {
        const readStream = new MyReadable(dataSource);
        readStream.setEncoding('utf-8')

        //未绑定data事件的时候调用resume方法，会导致数据流失
        readStream.resume();

        setTimeout(() => {
            readStream.on('data', (chunk) => {
                console.log('chunk: ', chunk);
            })
        }, 2000);

        expect(setTimeout).toHaveBeenCalledTimes(1);

    });
})
