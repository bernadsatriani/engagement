// @flow
import dispatch from 'micro-route/dispatch'
import { createError } from 'micro'
import { pipeP } from 'ramda'
import jwt from 'jsonwebtoken'
import getUsername from './url'
import calculate from './calculate'
import serve from './serve'
import auth from './auth'

export const app = pipeP(async (url: string) => getUsername(url), calculate)

const { SECRET_KEY: secretKey } = process.env

export default dispatch()
  .dispatch('/', 'GET', serve)
  .dispatch('/error', 'GET', serve)
  .dispatch('/auth', 'GET', auth)
  .otherwise(({ headers: { authorization }, url }: { url: string, headers: { authorization: string } }) => {
    try {
      global.token = jwt.verify(authorization, secretKey).token
    } catch (err) {
      console.error(err)
      throw createError(401, err)
    }
    return app(url)
  })
