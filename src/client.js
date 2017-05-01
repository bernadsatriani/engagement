import axios from 'axios'

export default () => axios.create({
  baseURL: 'https://api.instagram.com/v1',
  params: { access_token: global.token } // eslint-disable-line camelcase
})
