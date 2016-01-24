var _ = require('lodash');
var set = require('set');

module.exports = function createClass(Parent) {

    var instance = true;
    var constructor;
    var proto;
    var Child;

    if (typeof Parent === 'function') {
        proto = _.extend.apply(_, [{}].concat([].slice.call(arguments, 1)));
    } else {
        proto = _.extend.apply(_, [{}].concat([].slice.call(arguments)));
        Parent = function () {
        };
    }

    if (proto && _.has(proto, 'constructor')) {
        constructor = proto.constructor;
    } else {
        constructor = Parent;
    }

    Child = function () {

        var child = this;
        var args;
        var deepProps;

        if (child instanceof Child) {
            args = instance ? arguments : arguments[0];
            instance = true;

            deepProps = _.pickBy(child, function (prop) {
                return _.isPlainObject(prop) || _.isArray(prop);
            });

            set(child, deepProps);

            constructor.apply(child, args);

        } else {
            instance = false;
            return new Child(arguments);
        }
    };

    Child.prototype = Object.create(Parent.prototype);

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (proto) {
        set(Child.prototype, proto);
    }

    Child.prototype.constructor = Child;

    set(Child, Parent, {
        extend: function () {
            var args = [this].concat([].slice.call(arguments));
            return createClass.apply(null, args);
        }
    });

    return Child;
};
