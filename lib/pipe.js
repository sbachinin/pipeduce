const clone = require('lodash.clonedeep');
const warnIfPropsModified = require('./warnIfPropsModified');
const checkReturnType = require('./checkReturnType');
const checkRequiredProps = require('./checkRequiredProps');

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
  console.warn(`your pipe didn't return anything.
  One of your piped functions should return {
    pipeResult: <your desired result or smth falsy>
  }`)
};

function invokator(state, fn) {
  checkRequiredProps(fn, state)
  const result = fn(state)
  checkReturnType(fn, result) // must be object || undefined
  warnIfPropsModified(state, result)
  return result
}