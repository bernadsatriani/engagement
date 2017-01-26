export default (fn, obj) => {
  const key = `_${fn.name}`
  return obj[key] ||
    (obj[key] = fn.bind(obj)()) // eslint-disable-line no-param-reassign
}
