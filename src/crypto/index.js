import crypto from 'crypto';
import assert from 'assert';

//character encodings supported by nodejs v10.x
const ENCODING = ['hex', 'base64', 'ascii', 'utf8', 'utf16le', 'ucs2', 'latin1', 'binary']

/**
 * @param  {string} alg - 摘要算法
 * @param  {any} s - 消息
 * @param  {string} encoding - 摘要编码方式
 */
export function hash(alg, s, encoding = 'hex') {
    const h = crypto.createHash(alg);
    assert(ENCODING.includes(encoding), 'character encoding is not supported by nodejs!');

    const isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s);
    }
    h.update(s, isBuffer ? undefined : 'utf-8');

    const digest = h.digest(encoding);
    return digest;
}

export function md5(s, encoding) {
    return hash('md5', s, encoding);
}

export function sha1(s, encoding) {
    return hash('sha1', s, encoding);
}
/**
 * @param  {string} alg - 摘要算法 
 * @param  {string} secret - 密钥
 * @param  {any} s -加密内容
 * @param  {string} encoding
 */
export function hmac(alg, secret, s, encoding = 'base64') {
    const h = crypto.createHmac(alg, secret);
    assert(ENCODING.includes(encoding), 'character encoding is not supported by nodejs!');

    const isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s);
    }

    h.update(s, isBuffer ? undefined : 'utf-8');

    const digest = h.digest(encoding);
    console.log(digest)
    return digest;
}
/**
 * base64编码
 * @param  {string} s - target
 * @param  {boolean} urlSafe - instead of + and _ instead of / in the standard Base64 alphabet.
 */
export function base64_encode(s, urlSafe) {
    if (!Buffer.isBuffer(s)) {
        s = typeof Buffer.from === 'function' ? Buffer.from(s) : new Buffer(s);
    }
    let e = s.toString('base64');
    if (urlSafe) {
        e = e.replace(/\+/g, '-').replace(/\//, '_');
    }
    return e;
}

/**
 * base64解码
 * @param  {string} s
 * @param  {boolean} urlSafe
 * @param  {string} encoding
 */
export function base64_decode(s, urlSafe, encoding = 'utf-8') {
    let e = Buffer.from(s, 'base64');
    e = e.toString(encoding);
    if (urlSafe) {
        e = e.replace(/\-/, '+').replace('/\_/', '/');
    }
    return e;
}