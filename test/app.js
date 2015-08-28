'use strict';

var will = require('willy').will;
var yps = require('../app.js');

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
      yps.infiltrate(foo, 'bar');
      foo.bar.apply(foo.bar, args);

      will(foo.bar.calls[0]).haveOnly(args);
    });

    it('should still fire the original', function () {
      yps.infiltrate(foo, 'bar');
      foo.bar();

      will(count).be(1);
    });
  });

  describe('exfiltrate', function () {
    it('should restore original method', function () {
      var original = foo.bar.toString();
      yps.infiltrate(foo, 'bar');
      yps.exfiltrate(foo, 'bar');

      will(foo.bar.toString()).be(original);
    });

    it('should function as before', function () {
      yps.infiltrate(foo, 'bar');
      yps.exfiltrate(foo, 'bar');
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
      foo =  yps.infiltrate(foo);
      foo.apply(foo, args);

      will(foo.calls[0]).haveOnly(args);
    });

    it('should still fire the original', function () {
      foo = yps.infiltrate(foo);
      foo();

      will(count).be(1);
    });
  });

  describe('exfiltrate', function () {
    it('should restore original function', function () {
      var original = foo.toString();
      foo = yps.infiltrate(foo);
      foo = yps.exfiltrate(foo, 'bar');

      will(foo.toString()).be(original);
    });

    it('should function as before', function () {
      foo = yps.infiltrate(foo);
      foo = yps.exfiltrate(foo, 'bar');
      foo();

      will(count).be(1);
    });
  });
});

describe('purging', function () {
  it('should forget recorded calls', function () {
    var foo = function () {};
    foo = yps.infiltrate(foo);
    foo();
    foo.purge();
    will(foo.calls.length).be(0);
  });
});
