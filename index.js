import set from 'set';
import { has, extend, pickBy, isPlainObject, isArray } from 'lodash-es';

export default function createClass(...args) {
  let constructor;
  let Parent = args[0];
  let proto;

  if (typeof Parent === 'function') {
    proto = extend(...args.slice(1));
  } else {
    proto = extend(Parent, ...args);
    Parent = function _Parent() {
    };
  }

  if (proto && has(proto, 'constructor')) {
    constructor = proto.constructor;
  } else {
    constructor = Parent;
  }

  function Child(...params) {
    const child = this;

    if (!(child instanceof Child)) {
      return new Child(...params);
    }

    const deepProps = pickBy(child, prop => isPlainObject(prop) || isArray(prop));

    set(child, deepProps);

    constructor.apply(child, params);

    return child;
  }

  Child.prototype = Object.create(Parent.prototype);

  if (proto) {
    set(Child.prototype, proto);
  }

  Child.prototype.constructor = Child;

  set(Child, Parent, {
    extend(...params) {
      return createClass(this, ...params);
    },
  });

  return Child;
}
