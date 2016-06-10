const merge = require('lodash.merge');

module.exports = function createClass(...mixins) {
  const proto = merge({}, ...mixins);

  function Child(...params) {
    if (!(this instanceof Child)) {
      return new Child(...params);
    }

    if (proto.constructor) {
      proto.constructor.apply(this, params);
    }
  }

  Child.prototype = Object.create(proto);
  Child.prototype.constructor = Child;

  Child.extend = (...params) => {
    const ExtendedClass = createClass(Child.prototype, ...params);
    merge(ExtendedClass, Child);
    return ExtendedClass;
  };

  return Child;
};
