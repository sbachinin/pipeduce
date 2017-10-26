'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var warned = void 0;

module.exports = function (fn, result) {
  if (!!result && ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object' || Array.isArray(result))) {
    if (!warned) {
      console.warn('Piped function should return an object OR any falsy value.\n        ' + fn.name + ' returned ' + JSON.stringify(result));
      warned = true;
    }
    return true;
  }
};