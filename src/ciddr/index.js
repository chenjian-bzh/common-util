import cidrRegex from 'cidr-regex';
import ipRegex from 'ip-regex';
/**
 * 判断ip是否合法
 * @param  {String} ip
 */
export function isIp(ip) {
    return ipRegex({ exact: true }).test(ip);
}
/**
 * 判断Cidr是否合法
 * @param  {String} cidr
 */
export function isCidr(cidr) {
    return cidrRegex({ exact: true }).test(cidr);
}

/**
 * 判断子网Cidr是否合法
 * @param  {String} cidr
 */
export function isSubCidr(cidr) {
    let legal = isCidr(cidr);
    if (legal) {
        let { ips, mask } = splitCidr(cidr);
        if (mask > 16 && mask <= 24) {
            const legalValue = getLegalValue(ips[2], mask, 24);
            if (legalValue !== parseInt(ips[2])) {
                legal = false;
            }
        } else if (mask > 24) {
            const legalValue = getLegalValue(ips[3], mask, 32);
            if (legalValue !== parseInt(ips[3])) {
                legal = false;
            }
        }
    }
    return legal;
}
/**
 * 将Cidr地址分割成ip数组和mask
 * @param  {String} cidr
 * @return {Object}
 */
export function splitCidr(cidr) {
    if (!cidr) return {};
    let strs = cidr.split('/');
    const ips = strs[0].split('.');
    const mask = strs[1];
    return {
        ips,
        mask
    };
}

const getLegalValue = (value, mask, CONSTANT) => {
    const nextValue = Math.floor((value / (1 << (CONSTANT - mask)))) * (1 << (CONSTANT - mask));
    return nextValue;
};