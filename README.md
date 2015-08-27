# yps [![Build Status][travis-image]][travis-url]

a module for spying on function calls

```js
var spy = require('yps');
var obj = { foo: function () {} };

spy(obj, 'foo');

obj.foo(1, 2, 3);
obj.foo(4);
obj.foo(5, 6, 7, 8, 9);

console.log(obj.foo.calls[0]);  // [1, 2, 3]
console.log(obj.foo.calls[1]);  // [4]
console.log(obj.foo.calls[2]);  // [5, 6, 7, 8, 9]

```

[travis-image]: https://travis-ci.org/reergymerej/spy.svg
[travis-url]: https://travis-ci.org/reergymerej/spy