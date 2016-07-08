const test = require('ava');
const createClass = require('./index');

test('extend with flat props', t => {
  const BaseClass = createClass({
    a: 1,
    b: 2,
  });

  const ChildClass = BaseClass.extend({
    a: 2,
    c: 3,
  });

  const GrandchildClass = ChildClass.extend({
    a: 3,
    d: 4,
  });

  const baseClass = new BaseClass();
  const childClass = new ChildClass();
  const grandchildClass = new GrandchildClass();

  t.is(baseClass.a, 1);
  t.is(baseClass.b, 2);

  t.is(childClass.a, 2);
  t.is(childClass.b, 2);
  t.is(childClass.c, 3);

  t.is(grandchildClass.a, 3);
  t.is(grandchildClass.b, 2);
  t.is(grandchildClass.c, 3);
  t.is(grandchildClass.d, 4);
});

test('extend with nested props', t => {
  const baseArr = [{ a: { b: 1 } }, { c: { d: 2 } }];
  const childArr = [{ a: { b: 2 } }, { e: { f: 3 } }];
  const grandchildArr = [{ a: { b: 2 } }, { g: { h: 4 } }];

  const baseObj = { a: { b: 1 }, c: { d: 2 } };
  const childObj = { a: { b: 2 }, e: { f: 3 } };
  const grandchildObj = { a: { b: 3 }, g: { h: 4 } };

  const BaseClass = createClass({
    arr: baseArr,
    obj: baseObj,
  });

  const ChildClass = BaseClass.extend({
    arr: childArr,
    obj: childObj,
  });

  const GrandchildClass = ChildClass.extend({
    arr: grandchildArr,
    obj: grandchildObj,
  });

  const baseClass = new BaseClass();
  const childClass = new ChildClass();
  const grandchildClass = new GrandchildClass();

  t.deepEqual(baseClass.arr, baseArr);
  t.deepEqual(baseClass.obj, baseObj);

  t.deepEqual(childClass.arr, childArr);
  t.deepEqual(childClass.obj, { a: { b: 2 }, c: { d: 2 }, e: { f: 3 } });

  t.deepEqual(grandchildClass.arr, grandchildArr);
  t.deepEqual(grandchildClass.obj, { a: { b: 3 }, c: { d: 2 }, e: { f: 3 }, g: { h: 4 } });
});

test('init without new', t => {
  const baseClass = createClass({
    a: 1,
  });

  const instance = baseClass();

  t.is(instance.a, 1);
});

test('extending static flat properties', t => {
  const BaseClass = createClass();
  BaseClass.a = 1;
  BaseClass.b = 2;

  const ChildClass = BaseClass.extend();
  ChildClass.a = 2;
  ChildClass.c = 3;

  const GrandchildClass = ChildClass.extend();
  GrandchildClass.a = 3;
  GrandchildClass.d = 4;

  t.is(BaseClass.a, 1);
  t.is(BaseClass.b, 2);

  t.is(ChildClass.a, 2);
  t.is(ChildClass.b, 2);
  t.is(ChildClass.c, 3);

  t.is(GrandchildClass.a, 3);
  t.is(GrandchildClass.b, 2);
  t.is(GrandchildClass.c, 3);
  t.is(GrandchildClass.d, 4);
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
  t.true(childClass1 instanceof BaseClass);
});

test('independent instances with flat props', t => {
  const BaseClass = createClass({
    a: 1,
  });

  const ChildClass = BaseClass.extend({
    a: 2,
  });

  const baseClass = new BaseClass();
  const childClass1 = new ChildClass();
  const childClass2 = new ChildClass();

  childClass1.a = 3;

  t.is(childClass1.a, 3);
  t.is(childClass2.a, 2);
  t.is(baseClass.a, 1);
});

test('independent instances with nested props', t => {
  const BaseClass = createClass({
    a: {
      b: 1,
    },
  });

  const ChildClass = BaseClass.extend({
    a: {
      b: 2,
    },
  });

  const baseClass = new BaseClass();
  const childClass1 = new ChildClass();
  const childClass2 = new ChildClass();

  childClass1.a.b = 3;

  t.is(childClass1.a.b, 3);
  t.is(childClass2.a.b, 2);
  t.is(baseClass.a.b, 1);
});

test('constructor', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const ChildClass = BaseClass.extend();

  const GrandchildClass = ChildClass.extend();

  const grandchildClass = new GrandchildClass();

  t.is(grandchildClass.a, 1);
});
