import { num_transform } from './index'

describe('number', () => {
    describe('num_transform', () => {
        test('二进制转十进制', () => {
            expect(num_transform('1001', 2, 10)).toEqual('9')
        });
        test('十进制转二进制', () => {
            expect(num_transform(9, 10, 2)).toEqual('1001')
        })
        test('十六进制转十进制', () => {
            expect(num_transform(12, 16, 10)).toEqual('18')
        })
        test('十进制转十六进制', () => {
            expect(num_transform(18, 10, 16)).toEqual('12')
        })
    })
})