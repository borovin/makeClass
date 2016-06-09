const test = require('ava');
const createClass = require('./index');

test('create base class', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const baseClass = new BaseClass();

  t.is(baseClass.a, 1);
});

test('init without new', t => {
  const baseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const instance = baseClass();

  t.is(instance.a, 1);
});

test('extend class', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const ChildClass = BaseClass.extend({
    b: 2,
  });

  const childClass = new ChildClass();

  t.is(childClass.a, 1);
  t.is(childClass.b, 2);
});

