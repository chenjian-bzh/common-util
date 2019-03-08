import { isIp, isCidr, isSubCidr, splitCidr } from './index';

describe('cidr', () => {
    describe('isIp', () => {
        test.each([
            '1.1.1.23',
            '16.10.128.11'
        ])('reture true when param is a legal ip', (str) => {
            expect(isIp(str)).toEqual(true)
        });

        test.each([
            '1.1.1',
            '1.1.1.256'
        ])('reture false when param is a illegal ip', (str) => {
            expect(isIp(str)).toEqual(false)
        })
    })

    describe('isCidr', () => {
        test.each([
            '1.1.1.1/16',
            '1.1.1.1/24'
        ])('return true when param is legal cidr', (str) => {
            expect(isCidr(str)).toEqual(true)
        });

        test.each([
            '1.1.1.1',
            '1.1.1.1/50'
        ])('return false when param is illegal cidr', (str) => {
            expect(isCidr(str)).toEqual(false)
        })
    });


})