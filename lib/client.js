import { createError } from 'micro'
import axios from 'axios'

export default class ApiClient {
  createClient (...args) {
    this.client = axios.create(...args)
  }
  async get (url, params = {}) {
    try {
      const res = await this.client.get(url, { params })
      return res.data.data
    } catch (err) {
      const { response } = err
      throw createError(response ? response.status : 500, err)
    }
  }
}
