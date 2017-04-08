export default class OpenStruct {
  constructor (hash) {
    Object.keys(hash).forEach(k => this[k] = hash[k])
  }
}
