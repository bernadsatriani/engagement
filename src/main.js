// @flow
import dispatch from 'micro-route/dispatch'
import { createError } from 'micro'
import { pipeP } from 'ramda'
import getUsername from './url'
import calculate from './calculate'
import serve from './serve'
import auth from './auth'

export const app = pipeP(async (url: string) => getUsername(url), calculate)

export default dispatch()
  .dispatch('/', 'GET', serve)
  .dispatch('/error', 'GET', serve)
  .dispatch('/auth', 'GET', auth)
  .otherwise((req: { url: string, headers: { authorization: string } }) => {
    global.token = req.headers.authorization
    if (global.token) return app(req.url)
    throw createError(401, 'Authorization required')
  })
