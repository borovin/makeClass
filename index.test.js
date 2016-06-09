const test = require('ava');
const createClass = require('./index');

test('create base class', t => {
  const BaseClass = createClass({
    constructor() {
      this.a = 1;
    },
  });

  const baseClass = new BaseClass();

  t.is(baseClass.a, 1);
});

