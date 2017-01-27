import memo from '../lib/memoizer'

export default class User {
  constructor (hash) {
    Object.keys(hash).forEach(k => this[k] = hash[k])
  }
}
