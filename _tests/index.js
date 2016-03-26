import createClass from '../index';

describe('createClass', () => {
  it('createClass is function', () => {
    expect(typeof createClass).toBe('function');
  });

  it('Create class from function', () => {
    const O = createClass(function constructor() {
      this.a = 'a';
    });

    const o = new O();

    expect(o.a).toBe('a');
  });

  it('Create class from object with constructor method', () => {
    const O = createClass({
      constructor() {
        this.a = 'a';
      },
    });

    const o = new O();

    expect(o.a).toBe('a');
  });

  it('Instantiate without new', () => {
    const _class = createClass(function constructor() {
      this.a = 'a';
    });

    const o = _class();

    expect(o.a).toBe('a');
  });

  it('Pass params to constructor', () => {
    const O = createClass(function constructor(params) {
      this.a = params.a;
    });

    const o = new O({
      a: 'a',
    });

    expect(o.a).toBe('a');
  });

  it('Override string prop', () => {
    const O = createClass({
      string: 'a',
    });

    const OO = O.extend({
      string: 'b',
    });

    const o = new OO();

    expect(o.string).toBe('b');
  });

  it('Override number prop', () => {
    const O = createClass({
      number: 1,
    });

    const OO = O.extend({
      number: 2,
    });

    const o = new OO();

    expect(o.number).toBe(2);
  });

  it('Override bool prop', () => {
    const O = createClass({
      bool: true,
    });

    const OO = O.extend({
      bool: false,
    });

    const o = new OO();

    expect(o.bool).toBeFalsy();
  });

  it('Override object prop', () => {
    const O = createClass({
      object: {
        a: 'a',
        c: 1,
      },
    });

    const OO = O.extend({
      object: {
        b: 'b',
        c: 2,
      },
    });

    const o = new OO();

    expect(o.object.a).toBe('a');
    expect(o.object.b).toBe('b');
    expect(o.object.c).toBe(2);
  });

  it('Get proto props from constructor', () => {
    const O = createClass({
      a: 'a',
    });

    const OO = O.extend({
      constructor() {
        this.b = `${this.a}b`;
      },
    });

    const o = new OO();

    expect(o.b).toBe('ab');
  });

  it('Changes does not affect another instances', () => {
    const O = createClass({
      object: {
        a: 'a',
      },
    });

    const o1 = new O();
    const o2 = new O();

    o1.object.a = 'b';

    expect(o2.object.a).toBe('a');
  });

  it('Changes does not affect another instances', () => {
    const O = createClass({
      object: {
        a: 'a',
      },
      array: [{
        a: 'a',
      }],
    });

    const o1 = new O();
    const o2 = new O();

    o1.object.a = 'b';
    o1.array[0].a = 'b';

    expect(o2.object.a).toBe('a');
    expect(o2.array[0].a).toBe('a');
  });

  it('Complex object pass by reference', () => {
    const O1 = createClass({
      a: 'a',
    });

    const O2 = createClass({
      object: new O1(),
      array: [new O1()],
    });

    const o1 = new O2();
    const o2 = new O2();

    expect(o2.object === o1.object).toBeTruthy();
    expect(o2.array[0] === o1.array[0]).toBeTruthy();
  });

  it('Instance of works correctly', () => {
    const O = createClass();

    const OO = O.extend({
      a: 'a',
    });

    const o = new OO();

    expect(o instanceof OO).toBe(true);
    expect(o instanceof O).toBe(true);
  });

  it('Create new instance from constructor', () => {
    const O = createClass(function constructor() {
      this.a = 'a';
    });

    const OO = O.extend({
      clone() {
        return new this.constructor();
      },
    });

    const o = new OO();
    const o1 = o.clone();

    expect(o1.a).toBe('a');
  });

  it('Super constructor', () => {
    const O = createClass(function constructor() {
      this.a = 'a';
    });

    const OO = O.extend({
      constructor(...args) {
        O.apply(this, args);
      },
    });

    const o = new OO();

    expect(o.a).toBe('a');
  });

  it('Super method', () => {
    const O = createClass({
      b: 1,
      add() {
        this.b++;
      },
    });

    const OO = O.extend({
      add(...args) {
        O.prototype.add.apply(this, args);
        this.b++;
      },
    });

    const o = new OO();

    o.add();

    expect(o.b).toBe(3);
  });
});
