'use strict';

var will = require('willy').will;
var app = require('../bin/app.js');

describe('method', function () {
  var foo;
  var count;

  beforeEach(function () {
    foo = {
      bar: function () {
        count++;
      }
    };

    count = 0;
  });

  describe('infiltrate', function () {
    it('should track calls', function () {
      var args = [1, 2, 3, 4];
      app.infiltrate(foo, 'bar');
      foo.bar.apply(foo.bar, args);

      will(foo.bar.calls[0]).haveOnly(args);
    });

    it('should still fire the original', function () {
      app.infiltrate(foo, 'bar');
      foo.bar();

      will(count).be(1);
    });
  });

  describe('exfiltrate', function () {
    it('should restore original method', function () {
      var original = foo.bar.toString();
      app.infiltrate(foo, 'bar');
      app.exfiltrate(foo, 'bar');

      will(foo.bar.toString()).be(original);
    });

    it('should function as before', function () {
      app.infiltrate(foo, 'bar');
      app.exfiltrate(foo, 'bar');
      foo.bar();

      will(count).be(1);
    });
  });
});

describe('function', function () {
  var foo;
  var count;

  beforeEach(function () {
    foo = function () {
        count++;
    };

    count = 0;
  });

  describe('infiltrate', function () {
    it('should track calls', function () {
      var args = [1, 2, 3, 4];
      foo =  app.infiltrate(foo);
      foo.apply(foo, args);

      will(foo.calls[0]).haveOnly(args);
    });

    it('should still fire the original', function () {
      foo = app.infiltrate(foo);
      foo();

      will(count).be(1);
    });
  });

  describe('exfiltrate', function () {
    it('should restore original function', function () {
      var original = foo.toString();
      foo = app.infiltrate(foo);
      foo = app.exfiltrate(foo, 'bar');

      will(foo.toString()).be(original);
    });

    it('should function as before', function () {
      foo = app.infiltrate(foo);
      foo = app.exfiltrate(foo, 'bar');
      foo();

      will(count).be(1);
    });
  });
});
