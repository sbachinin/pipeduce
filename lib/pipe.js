'use strict';

var clone = require('lodash.clonedeep');
var warnIfPropsModified = require('./warnIfPropsModified');
var checkReturnType = require('./checkReturnType');
var warnIfMissingProps = require('./warnIfMissingProps');
var warnNoResult = require('./warnNoResult');

module.exports = function (fns, data) {
  var count = 0;
  var state = clone(data);
  while (fns[count]) {
    var returned = invokator(state, fns[count]);
    var haveFinalResult = returned && 'pipeResult' in returned;
    if (haveFinalResult) {
      // * final result can exist but be falsy
      return returned.pipeResult;
    }
    state = Object.assign({}, state, returned);
    count++;
  }
  warnNoResult();
};

function invokator(state, fn) {
  warnIfMissingProps(fn, state);
  var result = fn(state);
  var invalidReturn = checkReturnType(fn, result); // must be object || undefined
  if (invalidReturn) return;
  warnIfPropsModified(state, result);
  return result;
}