(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './cidr'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./cidr'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.cidr);
        global.index = mod.exports;
    }
})(this, function (module, exports, _cidr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _cidr2 = _interopRequireDefault(_cidr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        cidr: _cidr2.default
    };
    module.exports = exports['default'];
});