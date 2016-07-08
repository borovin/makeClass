/* eslint no-param-reassign: "off"*/
/* eslint consistent-return: "off"*/

const isPlainObject = require('lodash/isPlainObject');
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

function fill(obj = {}, ...sources) {
  const source = merge(...sources.reverse());

  forEach(source, (value, key) => {
    if (!obj[key]) {
      obj[key] = cloneDeep(value);
    }

    if (isPlainObject(obj[key])) {
      obj[key] = fill(obj[key], value);
    }
  });

  return obj;
}

module.exports = function createClass(Parent, ...mixins) {
  let constructor;
  let proto;
  const deepProto = {};
  const flatProto = {};

  if (typeof Parent === 'function') {
    proto = merge({}, ...mixins);
  } else {
    proto = merge({}, Parent, ...mixins);
    Parent = noop;
  }

  forEach(proto, (prop, key) => {
    if (isPlainObject(prop) || isArray(prop)) {
      deepProto[key] = prop;
    } else {
      flatProto[key] = prop;
    }
  });

  if (proto && proto.hasOwnProperty('constructor')) {
    constructor = proto.constructor;
  } else {
    constructor = Parent;
  }

  function Child(...params) {
    const child = this;

    if (child === global) {
      return new Child(...params);
    }

    fill(child, deepProto);
    constructor.apply(this, params);
  }

  Child.prototype = Object.create(Parent.prototype);

  if (proto) {
    extend(Child.prototype, flatProto);
  }

  Child.prototype.constructor = Child;

  merge(Child, Parent, {
    extend(...extensions) {
      return createClass(Child, ...extensions);
    },
  });

  return Child;
};
