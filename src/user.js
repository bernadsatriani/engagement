import Struct from '../lib/struct'
import Instagram from '../lib/instagram'

export default class User extends Struct {
  constructor (hash) {
    super(hash)
    this.client = this.constructor.createClient({ token: this.token, handle: this.username })
  }
  get engagement () {
    const total = this.images.map(i => i.likes.count).reduce((a, b) => a + b)
    return (total / this.images.length) / this.counts.followed_by
  }
  async fetchImages () {
    return this.images = await this.client.fetchImages(this.id)
  }
  static createClient = opts => new Instagram(opts)
  static async for ({ token, handle }) {
    const ig = this.constructor.createClient({ token, handle })
    const hash = await ig.fetchUser(handle)
    const user = new User({ token, ...hash })
    await user.fetchImages()
    return user
  }
}
