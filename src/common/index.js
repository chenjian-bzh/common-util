/**
 * @param  {} obj
 * @param  {} fn
 */
function forEach(obj, fn) {
  if (obj === null || obj === undefined) return;
  if (typeof obj !== 'object') {
    obj = [obj];
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const names = Object.getOwnPropertyNames(obj);
    for (let name of names) {
      fn.call(null, obj[name], name, obj);
    }
  }
}
/**
 * 将b属性赋予a, 并且b的方法中this指向target
 * @param  {} a
 * @param  {} b
 * @param  {} target
 */
function extend(a, b, target) {
  forEach(b, (val, key) => {
    if (typeof val === 'function') {
      a = val.bind(target);
    } else {
      a[key] = val
    }
  })
}

export default {
  forEach,
  extend
}