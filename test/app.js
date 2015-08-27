'use strict';

var will = require('willy').will;
var app = require('../app.js');

describe('sanity', function () {
  var obj;

  beforeEach(function () {
    obj = {
      foo: function () {},
      bar: function () {}
    };
  });

  it('should keep track of each call', function () {
    app(obj, 'foo');
    obj.foo();

    will(obj.foo.calls.length).be(1);
  });

  it('should work with functions', function () {
    var fn = app(function () {});

    fn();
    fn();
    fn();
    will(fn.calls.length).be(3);
  });

  it('should keep track of each call and the arguments passed', function () {
    app(obj, 'foo');
    obj.foo(1, 2, 3);
    obj.foo(4);
    obj.foo(5, 6, 7, 8, 9);

    will(obj.foo.calls[3]).haveOnly(5, 6, 7, 8, 9);
  });

  describe('original function', function () {
    it('should execute the original function', function () {
      var called = false;
      var fn = app(function () {
        called = true;
      });

      fn();
      will(called).be(true);
    });

    it('should maintain scope', function () {
      var scope;
      var obj = {};
      var fn = app(function () {
        scope = this;
      });

      fn.apply(obj);
      will(scope).be(obj);
    });
  });

  describe('original method', function () {
    it('should execute the original method', function () {
      var called = false;
      var obj = {
        foo: function () {
          called = true;
        }
      };

      obj.foo();
      will(called).be(true);
    });

    it('should maintain scope', function () {
      var scope;
      var obj = {
        foo: function () {
          scope = this;
        }
      };

      obj.foo();
      will(scope).be(obj);
    });
  });
});
