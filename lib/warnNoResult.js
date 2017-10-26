"use strict";

var warned = void 0;

module.exports = function () {
  if (warned) return;
  console.warn("your pipe didn't return anything.\n  One of your piped functions should return {\n    pipeResult: <your desired result or smth falsy>\n  }");
  warned = true;
};