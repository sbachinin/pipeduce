const pipe = require('../lib/pipe');


test('should return the pipeResult', () => {
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 555 }),
    () => ({c: 2})
  ]
  const result = pipe(fns, {})
  expect(result).toBe(555);
});


test('should not fail with pipeResult of 0', () => {
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 0 }),
    () => 'fsdfdsf'
  ]
  const result = pipe(fns, {})
  expect(result).toBe(0);
})


test('should not run fns after { pipeResult }', () => {
  const lastFn = jest.fn()
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 2 }),
    lastFn
  ]
  const result = pipe(fns, {})
  expect(lastFn).not.toHaveBeenCalled();
});