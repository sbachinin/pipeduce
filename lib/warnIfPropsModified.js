// if piped function tries to modify some props in state object,
// warn user that it's not recommended

const lodashIntersection = require('lodash.intersection');

module.exports = function(acc, result) {
    if (!result) return
    const oldPropNames = Object.keys(acc)
    const newPropNames = Object.keys(result)
    const modifiedProps = lodashIntersection(oldPropNames, newPropNames)
    if (modifiedProps.length > 0) {
      const oldValues = modifiedProps
      .map(prop => JSON.stringify(acc[prop]))
      .join(',\n ')
      const newValues = modifiedProps
      .map(prop => JSON.stringify(acc[prop]))
      .join(',\n ')
      console.warn(
`You are trying to modify a property that already exists in a piped object: 
${modifiedProps.join(', ')}.
Old values:
${oldValues}
New values:
${newValues}
It is not recommended`
      );
    }
}