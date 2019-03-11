import { md5, hash } from './index';

describe('crypto', () => {
    describe('md5', () => {
        test('digest string by md5', () => {
            expect(md5('hello world')).toBeDefined();
        })
    })
})

