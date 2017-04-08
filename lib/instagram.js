import { createError } from 'micro'
import Client from './client'

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

  async fetchUser () {
    const users = await this.get('/users/search', { q: this.handle })
    const foundUser = users.find(u => u.username === this.handle)
    if (!foundUser) throw createError(404, `User with handle ${this.handle} could not be found`)
    return await this.get(`/users/${foundUser.id}`)
  }
  async fetchImages (id) {
    return await this.get(`/users/${id}/media/recent`)
  }
}
