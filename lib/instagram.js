import { createError } from 'micro'
import Client from './client'
import memo from './memoizer'

export const baseUrl = 'https://api.instagram.com/v1'

export default class Instagram extends Client {
  constructor ({ handle, token }) {
    super()
    this.handle = handle
    if (!token) throw createError(400, 'No access token provided')
    this.createClient({
      baseURL: baseUrl,
      params: { access_token: token } // eslint-disable-line camelcase
    })
  }
  get user () {
    return memo(this.fetchUser, this)
  }
  fetchUser () {
    return this.get('/users/search', { q: this.handle }).then(d => {
      const user = d.find(m => m.username === this.handle)
      if (!user) throw createError(404, `User with handle ${this.handle} could not be found`)
      return user
    })
  }
}
