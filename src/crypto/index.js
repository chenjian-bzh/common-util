import crypto from 'crypto';
import debug from '../debug'
//character encodings supported by nodejs v10.x
const Encoding_Method = ['hex', 'base64', 'ascii', 'utf8', 'utf16le', 'ucs2', 'latin1', 'binary']
const logger = debug('util:crypto')

export function hash(alg, s, encoding = 'hex') {
    const hash = crypto.createHash(alg);
    if (!Encoding_Method.includes(encoding)) {
        logger.warn('character encoding is not supported by nodejs!')
    }
    hash.update()
}