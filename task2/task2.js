function deepClone(source, hash = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  if (hash.has(source)) {
    return hash.get(source);
  }

  if (source instanceof Date) {
    return new Date(source.getTime());
  }

  if (source instanceof RegExp) {
    const copy = new RegExp(source.source, source.flags);
    copy.lastIndex = source.lastIndex;
    return copy;
  }

  if (source instanceof Map) {
    const copy = new Map();
    hash.set(source, copy);
    source.forEach((value, key) => {
      copy.set(deepClone(key, hash), deepClone(value, hash));
    });
    return copy;
  }

  if (source instanceof Set) {
    const copy = new Set();
    hash.set(source, copy);
    source.forEach((value) => {
      copy.add(deepClone(value, hash));
    });
    return copy;
  }

  const copy = Array.isArray(source)
    ? []
    : Object.create(Object.getPrototypeOf(source));

  hash.set(source, copy);

  const keys = Reflect.ownKeys(source);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);

    if (descriptor) {
      if ('value' in descriptor) {
        descriptor.value = deepClone(descriptor.value, hash);
      }
      Object.defineProperty(copy, key, descriptor);
    }
  }

  return copy;
}
