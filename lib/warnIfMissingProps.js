'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// import throttle from 'lodash.throttle';

// export default throttle(checkRequiredProps, 1000, {trailing: true})

var warned = void 0;

module.exports = function (fn, state) {
  if (warned) return;
  if (fn.requiredProps) {
    var requiredNames = Object.keys(fn.requiredProps);
    requiredNames.forEach(function (name) {
      var requiredType = fn.requiredProps[name];
      var error = checkSingleProp(fn, state, name, requiredType);
      if (error) {
        warned = true;
        console.warn(error);
      }
    });
  }
};

function checkSingleProp(fn, state, requiredName, requiredType) {
  var prop = state[requiredName];
  if (!prop && prop !== 0) return '\n    You didn\'t supply ' + requiredName + ' to ' + fn.name;
  var type = Array.isArray(prop) ? 'array' : typeof prop === 'undefined' ? 'undefined' : _typeof(prop);
  if (type !== requiredType) return '\n    ' + requiredName + ' of invalid type (' + type + ') is supplied to function ' + fn.name + '.\n    Should be: ' + requiredType;
}