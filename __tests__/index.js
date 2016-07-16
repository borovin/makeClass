const createClass = require('../index');

describe('createClass', () => {
  it('should extend with flat props', () => {
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

    expect(baseClass.a).toBe(1);
    expect(baseClass.b).toBe(2);

    expect(childClass.a).toBe(2);
    expect(childClass.b).toBe(2);
    expect(childClass.c).toBe(3);

    expect(grandchildClass.a).toBe(3);
    expect(grandchildClass.b).toBe(2);
    expect(grandchildClass.c).toBe(3);
    expect(grandchildClass.d).toBe(4);
  });

  it('should extend with nested props', () => {
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

    expect(baseClass.arr).toEqual(baseArr);
    expect(baseClass.obj, baseObj).toEqual(baseObj);

    expect(childClass.arr).toEqual(childArr);
    expect(childClass.obj).toEqual({ a: { b: 2 }, c: { d: 2 }, e: { f: 3 } });

    expect(grandchildClass.arr).toEqual(grandchildArr);
    expect(grandchildClass.obj).toEqual({ a: { b: 3 }, c: { d: 2 }, e: { f: 3 }, g: { h: 4 } });
  });

  it('should init without new', () => {
    const baseClass = createClass({
      a: 1,
    });

    const instance = baseClass();

    expect(instance.a).toBe(1);
  });

  it('extending static flat properties', () => {
    const BaseClass = createClass();
    BaseClass.a = 1;
    BaseClass.b = 2;

    const ChildClass = BaseClass.extend();
    ChildClass.a = 2;
    ChildClass.c = 3;

    const GrandchildClass = ChildClass.extend();
    GrandchildClass.a = 3;
    GrandchildClass.d = 4;

    expect(BaseClass.a).toBe(1);
    expect(BaseClass.b).toBe(2);

    expect(ChildClass.a).toBe(2);
    expect(ChildClass.b).toBe(2);
    expect(ChildClass.c).toBe(3);

    expect(GrandchildClass.a).toBe(3);
    expect(GrandchildClass.b).toBe(2);
    expect(GrandchildClass.c).toBe(3);
    expect(GrandchildClass.d).toBe(4);
  });

  it('instanceOf should be correct', () => {
    const BaseClass = createClass({
      constructor() {
        this.a = 1;
      },
    });

    const ChildClass1 = BaseClass.extend({
      b: 2,
    });

    const ChildClass2 = BaseClass.extend({
      b: 2,
    });

    const childClass1 = new ChildClass1();

    expect(childClass1 instanceof ChildClass1).toBe(true);
    expect(childClass1 instanceof ChildClass2).toBe(false);
    expect(childClass1 instanceof BaseClass).toBe(true);
  });

  it('instance flat properties should be independent', () => {
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

    expect(childClass1.a).toBe(3);
    expect(childClass2.a).toBe(2);
    expect(baseClass.a).toBe(1);
  });

  it('instance nested properties should be independent', () => {
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

    expect(childClass1.a.b).toBe(3);
    expect(childClass2.a.b).toBe(2);
    expect(baseClass.a.b).toBe(1);
  });

  it('child class should call parent constructor', () => {
    const BaseClass = createClass({
      constructor() {
        this.a = 1;
      },
    });

    const ChildClass = BaseClass.extend();

    const GrandchildClass = ChildClass.extend();

    const grandchildClass = new GrandchildClass();

    expect(grandchildClass.a).toBe(1);
  });

  it('should extend properties with overridden parent constructor', () => {
    const BaseClass = createClass({
      a: 1,
      b: 2,
      constructor() {
        this.e = 5;
      },
    });

    const ChildClass = BaseClass.extend({
      a: 2,
      c: 3,
    });

    const GrandchildClass = ChildClass.extend({
      a: 3,
      d: 4,
    });

    const grandchildClass = new GrandchildClass();

    expect(grandchildClass.a).toBe(3);
    expect(grandchildClass.b).toBe(2);
    expect(grandchildClass.c).toBe(3);
    expect(grandchildClass.d).toBe(4);
    expect(grandchildClass.e).toBe(5);
  });

  it('should extend properties with overridden child constructor', () => {
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
      constructor() {
        this.e = 5;
      },
    });

    const grandchildClass = new GrandchildClass();

    expect(grandchildClass.a).toBe(3);
    expect(grandchildClass.b).toBe(2);
    expect(grandchildClass.c).toBe(3);
    expect(grandchildClass.d).toBe(4);
    expect(grandchildClass.e).toBe(5);
  });

  it('should change property on method after extending', () => {
    const BaseClass = createClass({
      a: 1,
    });

    const ChildClass = BaseClass.extend({
      a() {
        return 1;
      },
    });

    const childClass = new ChildClass();

    expect(childClass.a()).toBe(1);
  });
});
