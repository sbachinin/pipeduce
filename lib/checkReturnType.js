module.exports = function(fn, result) {
  if (
    !!result &&
    (typeof result !== 'object' || Array.isArray(result))
  )  {
    console.warn(
      `Piped function should return an object OR any falsy value.
      ${fn.name} returned ${JSON.stringify(result)}`
    )
  }
};
