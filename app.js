'use strict';

var infiltrate = function (fn) {
  return (function () {
    var spy = function spy() {
      var args = Array.prototype.slice.apply(arguments);
      spy.calls.push(args);
      fn.apply(this, args);
    };

    spy.calls = [];

    return spy;
  }());
};

module.exports = function (scope, method) {

  if (arguments.length === 2 && typeof scope[method] === 'function') {
    scope[method] = infiltrate(scope[method]);
  } else if (typeof scope === 'function') {
    return infiltrate(scope);
  }
};
