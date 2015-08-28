'use strict';

var addSpy = function (fn) {
  return (function () {
    var spy = function () {
      var args = Array.prototype.slice.apply(arguments);
      spy.calls.push(args);
      fn.apply(this, args);
    };

    spy.fn = fn;
    spy.calls = [];
    spy.purge = function () {
      this.calls = [];
    };

    return spy;
  }());
};

var removeSpy = function (spy) {
  return spy.fn;
};

var handleRequest = function (fn, scope, member) {
  if (typeof scope[member] === 'function') {
    scope[member] = fn(scope[member]);
  } else if (typeof scope === 'function') {
    return fn(scope);
  }
};

var infiltrate = function (scope, method) {
  return handleRequest(addSpy, scope, method);
};

var exfiltrate = function (scope, method) {
  return handleRequest(removeSpy, scope, method);
};

module.exports = {
  infiltrate: infiltrate,
  exfiltrate: exfiltrate
};
