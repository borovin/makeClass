/* eslint no-param-reassign: "off"*/
/* eslint consistent-return: "off"*/

const isArray = require('lodash/isArray');
const noop = require('lodash/noop');
const forEach = require('lodash/forEach');
const extend = require('lodash/extend');
const cloneDeep = require('lodash/cloneDeep');
const mergeWith = require('lodash/mergeWith');

function merge(obj = {}, ...sources) {
  return mergeWith(obj, ...sources, (objValue, sourceValue) => {
    if (isArray(sourceValue)) {
      return cloneDeep(sourceValue);
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
    Parent = noop;
  }

  forEach(proto, (prop, key) => {
    if (typeof prop === 'function') {
      protoMethods[key] = prop;
    } else {
      protoProperties[key] = prop;
    }
  });

  if (proto && proto.hasOwnProperty('constructor')) {
    constructor = proto.constructor;
  } else {
    constructor = Parent.classConstructor || Parent;
  }

  function Child(...params) {
    const child = this;

    if (child === global) {
      return new Child(...params);
    }

    merge(child, Child.classProperties);

    constructor.apply(this, params);
  }

  Child.prototype = Object.create(Parent.prototype);

  if (proto) {
    extend(Child.prototype, protoMethods);
  }

  Child.prototype.constructor = Child;

  merge(Child, Parent, {
    extend(...extensions) {
      return createClass(Child, ...extensions);
    },
    classProperties: protoProperties,
    classConstructor: constructor,
  });

  return Child;
};
