let warned

module.exports = function(fn, result) {
  if (
    !!result &&
    (typeof result !== 'object' || Array.isArray(result))
  )  {
    if (!warned) {
      console.warn(
        `Piped function should return an object OR any falsy value.
        ${fn.name} returned ${JSON.stringify(result)}`
      )
      warned = true
    }
    return true
  }
};
