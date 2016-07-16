/* eslint no-param-reassign: "off"*/
/* eslint consistent-return: "off"*/

const _ = require('lodash');

function merge(obj = {}, ...sources) {
  return _.mergeWith(obj, ...sources, (objValue, sourceValue) => {
    if (_.isArray(sourceValue)) {
      return _.cloneDeep(sourceValue);
    }
  });
}

module.exports = function createClass(Parent, ...mixins) {
  let constructor;
  let proto;
  const protoProperties = {};
  const protoMethods = {};

  if (typeof Parent === 'function') {
    proto = merge({}, ...mixins);
  } else {
    proto = merge({}, Parent, ...mixins);
    Parent = _.noop;
  }

  _.forEach(proto, (prop, key) => {
    if (typeof prop === 'function') {
      protoMethods[key] = prop;
    } else {
      protoProperties[key] = prop;
    }
  });

  if (proto && proto.hasOwnProperty('constructor')) {
    constructor = proto.constructor;
  } else {
    constructor = Parent.constructor || Parent;
  }

  function Child(...params) {
    const child = this;

    if (child === global) {
      return new Child(...params);
    }

    merge(child, Child.properties);

    constructor.apply(this, params);
  }

  Child.prototype = Object.create(Parent.prototype);

  if (proto) {
    _.extend(Child.prototype, protoMethods);
  }

  Child.prototype.constructor = Child;

  merge(Child, Parent, {
    extend(...extensions) {
      return createClass(Child, ...extensions);
    },
    properties: protoProperties,
    constructor,
  });

  Child.properties = _.omit(Child.properties, _.keys(protoMethods));

  return Child;
};
