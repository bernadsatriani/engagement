import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.instagram.com/v1',
  params: { access_token: process.env.INSTAGRAM_TOKEN } // eslint-disable-line camelcase
})
