# pipeduce

> Constrained and break-able "reduce" for function composition.

Improves readability, allowing to have a 'table of contents' for complex pieces of code

## Install

```
$ npm install pipeduce
```

## Usage

Provide a list of functions (ideally, not bound to anything) and a state object like this:
```js
const pipeduce = require('pipeduce');
const result = pipeduce(
  [ getGirl, sing, twist, goHomeIfBored, shout, getResult ],
  { cocktail: 2, beer: 4, cigarettes: 32 }
)
```

Example of piped function:
```js
function getGirl({ beer }) {
  if (beer > 10) { pipeResult: 'go home' } // -> break from pipe with this result
  if (beer > 2) return // -> go to next function
  return { girl: getRandomGirl() } // -> add a girl to state object
}
```

#### Every piped function:
- is given a `single argument`: a state object, probably extended by the previous functions
- `can only extend` but not overwrite the state object
- `must return an object` that will be merged into the state object. You will get a console.warn  if a primitive value (or an array) is returned
- `can stop the pipe` by returning { pipeResult: any }. This pipeResult will be the return value of the entire pipe. (Thus the pipe's return value can be anything, not a state object). If none of the piped functions returns pipeResult, the entire pipe returns nothing, and you'll be console.warned about that
- should be used `not to modify existing props` of state object. (console.warn)
- can `require some properties` to be present in the state object & warn you if they are not present:
```js
getGirl.requiredProps = {
  beer: 'number'
}
```