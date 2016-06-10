const test = require('ava');
const createClass = require('./index');

test('create base class', t => {
  const BaseClass = createClass({
    a: 1,
  });

  const baseClass = new BaseClass();

  t.is(baseClass.a, 1);
});

test('init without new', t => {
  const baseClass = createClass({
    a: 1,
  });

  const instance = baseClass();

  t.is(instance.a, 1);
});

test('extend class', t => {
  const BaseClass = createClass({
    a: 1,
  });

  const ChildClass = BaseClass.extend({
    a: 2,
  });

  const childClass = new ChildClass();
  const baseClass = new BaseClass();

  t.is(baseClass.a, 1);
  t.is(childClass.a, 2);
});

test('extending class static properties', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  BaseClass.staticProperty = 1;

  const ChildClass = BaseClass.extend({
    b: 2,
  });

  t.is(ChildClass.staticProperty, 1);
});

test('instanceOf', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const ChildClass1 = BaseClass.extend({
    b: 1,
  });

  const ChildClass2 = BaseClass.extend({
    b: 2,
  });

  const childClass1 = new ChildClass1();

  t.true(childClass1 instanceof ChildClass1);
  t.false(childClass1 instanceof ChildClass2);
  t.false(childClass1 instanceof BaseClass);
});

test('extending nested data', t => {
  const BaseClass = createClass({
    a: {
      b: 1,
    },
  });

  const ChildClass = BaseClass.extend({
    a: {
      c: 2,
    },
  });

  const baseClass = new BaseClass();
  const childClass = new ChildClass();

  t.is(childClass.a.b, 1);
  t.is(childClass.a.c, 2);
  t.is(baseClass.a.b, 1);
  t.falsy(baseClass.a.c);
});

test('extending array fields', t => {
  const BaseClass = createClass({
    a: [1, 2, 3],
  });

  const ChildClass = BaseClass.extend({
    a: [4, 5, 6],
  });

  const baseClass = new BaseClass();
  const childClass = new ChildClass();

  t.deepEqual(childClass.a, [4, 5, 6]);
  t.deepEqual(baseClass.a, [1, 2, 3]);
});

