let warned

module.exports = function() {
  if (warned) return
  console.warn(`your pipe didn't return anything.
  One of your piped functions should return {
    pipeResult: <your desired result or smth falsy>
  }`)
  warned = true
}
