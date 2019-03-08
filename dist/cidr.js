(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'cidr-regex', 'ip-regex'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('cidr-regex'), require('ip-regex'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.cidrRegex, global.ipRegex);
        global.cidr = mod.exports;
    }
})(this, function (exports, _cidrRegex, _ipRegex) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isIp = isIp;
    exports.isCidr = isCidr;
    exports.isSubCidr = isSubCidr;
    exports.splitCidr = splitCidr;

    var _cidrRegex2 = _interopRequireDefault(_cidrRegex);

    var _ipRegex2 = _interopRequireDefault(_ipRegex);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function isIp(ip) {
        return (0, _ipRegex2.default)({ exact: true }).test(ip);
    }

    function isCidr(cidr) {
        return (0, _cidrRegex2.default)({ exact: true }).test(cidr);
    }

    function isSubCidr(cidr) {
        var legal = isCidr(cidr);
        if (legal) {
            var _splitCidr = splitCidr(cidr),
                ips = _splitCidr.ips,
                mask = _splitCidr.mask;

            if (mask > 16 && mask <= 24) {
                var legalValue = getLegalValue(ips[2], mask, 24);
                if (legalValue !== parseInt(ips[2])) {
                    legal = false;
                }
            } else if (mask > 24) {
                var _legalValue = getLegalValue(ips[3], mask, 32);
                if (_legalValue !== parseInt(ips[3])) {
                    legal = false;
                }
            }
        }
        return legal;
    }

    function splitCidr(cidr) {
        // if (!isCidr(cidr)) return {};
        if (!cidr) return {};
        var strs = cidr.split('/');
        var ips = strs[0].split('.');
        var mask = strs[1];
        return {
            ips: ips,
            mask: mask
        };
    }

    var getLegalValue = function getLegalValue(value, mask, CONSTANT) {
        var nextValue = Math.floor(value / (1 << CONSTANT - mask)) * (1 << CONSTANT - mask);
        return nextValue;
    };
});