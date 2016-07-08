/* eslint no-param-reassign: "off"*/

const merge = require('./merge');
const forEach = require('lodash/forEach');
const cloneDeep = require('lodash/cloneDeep');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function fill(obj = {}, ...sources) {
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
};
