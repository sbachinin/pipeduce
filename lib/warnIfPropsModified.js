'use strict';

// if piped function tries to modify some props in state object,
// warn user that it's not recommended

var lodashIntersection = require('lodash.intersection');
var warned = void 0;

module.exports = function (acc, result) {
  if (warned) return;
  if (!result) return;
  var oldPropNames = Object.keys(acc);
  var newPropNames = Object.keys(result);
  var modifiedProps = lodashIntersection(oldPropNames, newPropNames);
  if (modifiedProps.length > 0) {
    warned = true;
    var oldValues = modifiedProps.map(function (prop) {
      return JSON.stringify(acc[prop]);
    }).join(',\n ');
    var newValues = modifiedProps.map(function (prop) {
      return JSON.stringify(result[prop]);
    }).join(',\n ');
    console.warn('You are trying to modify a property that already exists in a piped object: \n' + modifiedProps.join(', ') + '.\nOld values:\n' + oldValues + '\nNew values:\n' + newValues + '\nIt is not recommended');
  }
};