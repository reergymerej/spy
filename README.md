# yps [![Build Status][travis-image]][travis-url] [![npm version][npm-image]][npm-url]

a reversible, transparent spy for functions/methods

### Infiltration

**functions**
```js
var logHello = function () { console.log('Hello!'); };
logHello = yps.infiltrate(logHello);
```

**methods**
```js
var scope = {
  logHello: function () { console.log('Hello!'); }
};
yps.infiltrate(scope, 'logHello');
```

### Reports

Once a spy has infiltrated, it will record the arguments for each call.
```js
logHello(42, 'purple');
logHello();
logHello.calls;  // [[42, 'purple'], []]
```

You can purge the calls (in case your spy gets burned).
```js
logHello.purge();
logHello.calls;  // []
```

### Exfiltration

Remove your spy and any trace that it ever existed.

**functions**
```js
logHello = yps.exfiltrate(logHello);
```

**methods**
```js
yps.exfiltrate(scope, 'logHello');
```

[travis-image]: https://travis-ci.org/reergymerej/spy.svg
[travis-url]: https://travis-ci.org/reergymerej/spy
[npm-image]: https://badge.fury.io/js/yps.svg
[npm-url]: https://www.npmjs.com/package/yps
