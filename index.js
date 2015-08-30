var _ = require('bower_components/lodash/lodash.js'),
    deepExtend = require('bower_components/deepExtend/index.js');

module.exports = function createClass(Parent) {

    var instance = true,
        constructor,
        proto;

    if (typeof Parent === 'function') {
        proto = _.extend.apply(_, [{}].concat([].slice.call(arguments, 1)));
    } else {
        proto = _.extend.apply(_, [{}].concat([].slice.call(arguments)));
        Parent = function(){};
    }

    if (proto && _.has(proto, 'constructor')) {
        constructor = proto.constructor;
    } else {
        constructor = Parent;
    }

    var Child = function() {
        var args;
        if (this instanceof Child) {
            args = instance ? arguments : arguments[0];
            instance = true;

            deepExtend(this, _.pick(this, function(prop){
                return _.isPlainObject(prop) || _.isArray(prop);
            }));

            constructor.apply(this, args);

        } else {
            instance = false;
            return new Child(arguments);
        }
    };

    Child.prototype = Object.create(Parent.prototype);

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (proto) {
        deepExtend(Child.prototype, proto);
    }

    Child.prototype.constructor = Child;

    return deepExtend(Child, Parent, {
        extend: function() {
            var args = [this].concat([].slice.call(arguments));
            return createClass.apply(null, args);
        }
    });
};