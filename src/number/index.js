/**
 * 进制转换
 * @param x - 待转换的数
 * @param {Number, String} from_base - 当前进制
 * @param {Number, String} to_base - 目标进制
 */
export function num_transform(x, from_base, to_base) {
    if (!from_base || isNaN(from_base) || !to_base || isNaN(to_base)) return x;
    if (!isNaN(parseInt(x, from_base))) {
        return parseInt(x, from_base).toString(to_base);
    }
    return x;
}