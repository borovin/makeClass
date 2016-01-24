var createClass = require('../index');

describe(module.id, function () {

    it('createClass is function', function () {
        expect(typeof createClass).toBe('function');
    });

    it('Create class from function', function () {

        var O = createClass(function () {
            this.a = 'a';
        });

        var o = new O();

        expect(o.a).toBe('a');
    });

    it('Create class from object with constructor method', function () {

        var O = createClass({
            constructor: function () {
                this.a = 'a';
            }
        });

        var o = new O();

        expect(o.a).toBe('a');
    });

    it('Instantiate without new', function () {

        var _class = createClass(function () {
            this.a = 'a';
        });

        var o = _class();

        expect(o.a).toBe('a');

    });

    it('Pass params to constructor', function () {

        var O = createClass(function (params) {
            this.a = params.a;
        });

        var o = new O({
            a: 'a'
        });

        expect(o.a).toBe('a');

    });

    it('Override string prop', function () {

        var O = createClass({
            string: 'a'
        });

        var OO = O.extend({
            string: 'b'
        });

        var o = new OO();

        expect(o.string).toBe('b');

    });

    it('Override number prop', function () {

        var O = createClass({
            number: 1
        });

        var OO = O.extend({
            number: 2
        });

        var o = new OO();

        expect(o.number).toBe(2);

    });

    it('Override bool prop', function () {

        var O = createClass({
            bool: true
        });

        var OO = O.extend({
            bool: false
        });

        var o = new OO();

        expect(o.bool).toBeFalsy();

    });

    it('Override object prop', function () {

        var O = createClass({
            object: {
                a: 'a',
                c: 1
            }
        });

        var OO = O.extend({
            object: {
                b: 'b',
                c: 2
            }
        });

        var o = new OO();

        expect(o.object.a).toBe('a');
        expect(o.object.b).toBe('b');
        expect(o.object.c).toBe(2);

    });

    it('Get proto props from constructor', function () {

        var O = createClass({
            a: 'a'
        });

        var OO = O.extend({
            constructor: function () {
                this.b = this.a + 'b';
            }
        });

        var o = new OO();

        expect(o.b).toBe('ab');

    });

    it('Changes does not affect another instances', function () {

        var O = createClass({
            object: {
                a: 'a'
            }
        });

        var o1 = new O();
        var o2 = new O();

        o1.object.a = 'b';

        expect(o2.object.a).toBe('a');

    });

    it('Changes does not affect another instances', function () {

        var O = createClass({
            object: {
                a: 'a'
            },
            array: [{
                a: 'a'
            }]
        });

        var o1 = new O();
        var o2 = new O();

        o1.object.a = 'b';
        o1.array[0].a = 'b';

        expect(o2.object.a).toBe('a');
        expect(o2.array[0].a).toBe('a');

    });

    it('Complex object pass by reference', function () {

        var O1 = createClass({
            a: 'a'
        });

        var O2 = createClass({
            object: new O1(),
            array: [
                new O1()
            ]
        });

        var o1 = new O2();
        var o2 = new O2();

        expect(o2.object === o1.object).toBeTruthy();
        expect(o2.array[0] === o1.array[0]).toBeTruthy();

    });

    it('Instance of works correctly', function () {

        var O = createClass();

        var OO = O.extend({
            a: 'a'
        });

        var o = new OO();

        expect(o instanceof OO).toBe(true);
        expect(o instanceof O).toBe(true);

    });

    it('Create new instance from constructor', function () {

        var O = createClass(function () {
            this.a = 'a';
        });

        var OO = O.extend({
            clone: function () {
                return new this.constructor();
            }
        });

        var o = new OO();
        var o1 = o.clone();

        expect(o1.a).toBe('a');
    });

    it('Super constructor', function () {

        var O = createClass(function () {
            this.a = 'a';
        });

        var OO = O.extend({
            constructor: function () {
                O.apply(this, arguments);
            }
        });

        var o = new OO();

        expect(o.a).toBe('a');
    });

    it('Super method', function () {

        var O = createClass({
            b: 1,
            add: function () {
                this.b++;
            }
        });

        var OO = O.extend({
            add: function () {
                O.prototype.add.apply(this, arguments);
                this.b++;
            }
        });

        var o = new OO();

        o.add();

        expect(o.b).toBe(3);
    });
});
