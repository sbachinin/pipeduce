const clone = require('lodash.clonedeep');
const warnIfPropsModified = require('./warnIfPropsModified');
const checkReturnType = require('./checkReturnType');
const warnIfMissingProps = require('./warnIfMissingProps');
const warnNoResult = require('./warnNoResult');

module.exports = function(fns, data) {
  let count = 0
  let state = clone(data)
  while (fns[count]) {
    const returned = invokator(state, fns[count])
    const haveFinalResult = returned && ('pipeResult' in returned)
    if (haveFinalResult) {
      // * final result can exist but be falsy
      return returned.pipeResult
    }
    state = Object.assign({}, state, returned)
    count++
  }
  warnNoResult()
};

function invokator(state, fn) {
  warnIfMissingProps(fn, state)
  const result = fn(state)
  const invalidReturn = checkReturnType(fn, result) // must be object || undefined
  if (invalidReturn) return
  warnIfPropsModified(state, result)
  return result
}