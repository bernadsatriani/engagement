import { createError } from 'micro'
import axios from 'axios'

export default class ApiClient {
  createClient (...args) {
    this.client = axios.create(...args)
  }
  async get (url, params) {
    try {
      const res = await this.client.get(url, { params })
      return res.data.data
    } catch (err) {
      throw createError(err.response.status, err.response.data.meta.error_message)
    }
  }
}
