import micro, { createError } from 'micro'
import URL from '../lib/url-parser'
import Instagram from '../lib/instagram'
import User from './user'

const app = async req => {
  const url = new URL(req.url)
  if (!url.valid) throw createError(400, 'Invalid url')

  const ig = new Instagram({ handle: url.username, token: req.headers.authorization })
  const user = new User(await ig.fetchUser())
  return user
}

const srv = micro(app)
srv.listen(3000, () => console.log('Listening on port 3000'))
export default srv
