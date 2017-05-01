// @flow
/* eslint-disable camelcase */
import { post } from 'axios'
import { stringify } from 'qs'
import jwt from 'jsonwebtoken'
import serve from './serve'

const TOKEN_ENDPOINT = ' https://api.instagram.com/oauth/access_token'
const {
  INSTAGRAM_CLIENT_ID: client_id,
  INSTAGRAM_CLIENT_SECRET: client_secret,
  SECRET_KEY: secretKey
} = process.env

const opts = ({ host, code }: { host: string, code: string }) => stringify({
  grant_type: 'authorization_code',
  redirect_uri: `https://${host}/auth`,
  client_id,
  client_secret,
  code
})

export default async (req: { headers: { host: string } }, res: { setHeader: () => void }, { query: { code, error } }: { query: { code: string, error: string } }) => {
  const handleError = e => {
    console.log(e)
    const query = { error: e }
    return serve(req, res, { query }, 'error')
  }

  const { headers: { host } } = req
  if (error) return handleError(error)
  if (!code) return handleError('Please provide an OAuth code')
  try {
    const { data: { access_token, user } } = await post(TOKEN_ENDPOINT, opts({ code, host }))
    const token = jwt.sign({ token: access_token }, secretKey)

    return serve(req, res, { query: { token, name: user.full_name } })
  } catch (err) {
    if (err.response) return handleError(err.response.data.error_message)
    return handleError(err)
  }
}
