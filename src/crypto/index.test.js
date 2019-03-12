import { md5, sha1, hmac } from './index';

describe('crypto', () => {
    describe('hash', () => {
        test('digest string by md5', () => {
            expect(md5('hello world')).toBeDefined();
        });
        test('digest string by sha1', () => {
            expect(sha1('hello world')).toBeDefined();
        })
    });
    describe('hmac', () => {
        test('test hmac', () => {
            expect(hmac('md5', 'a secret', 'hello world')).toBeDefined();
        })
    })
})

