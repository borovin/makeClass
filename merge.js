/* eslint consistent-return: "off"*/

const mergeWith = require('lodash/mergeWith');
const isArray = require('lodash/isArray');
const cloneDeep = require('lodash/cloneDeep');

module.exports = function merge(obj = {}, ...sources) {
  return mergeWith(obj, ...sources, (objValue, sourceValue) => {
    if (isArray(sourceValue)) {
      return cloneDeep(sourceValue);
    }
  });
};
