// import throttle from 'lodash.throttle';

// export default throttle(checkRequiredProps, 1000, {trailing: true})

let warned

module.exports = function(fn, state) {
  if (warned) return
  if (fn.requiredProps) {
    const requiredNames = Object.keys(fn.requiredProps)
    requiredNames.forEach(name => {
      const requiredType = fn.requiredProps[name]
      const error = checkSingleProp(fn, state, name, requiredType)
      if (error) {
        warned = true
        console.warn(error)
      }
    })
  }
}


function checkSingleProp(fn, state, requiredName, requiredType) {
  const prop = state[requiredName]
  if (!prop && prop !== 0) return `
    You didn't supply ${requiredName} to ${fn.name}`
  const type = Array.isArray(prop) ? 'array' : typeof prop
  if (type !== requiredType) return `
    ${requiredName} of invalid type (${type}) is supplied to function ${fn.name}.
    Should be: ${requiredType}`
}
