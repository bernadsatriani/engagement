import micro, { createError } from 'micro'
import URL from './url-parser'
import User from './user'

const app = async req => {
  const url = new URL(req.url)
  if (!url.valid) throw createError(400, 'Invalid url')

  const { username, engagement } = await User.for({ handle: url.username, token: req.headers.authorization })
  return { username, engagement }
}

const srv = micro(app)
srv.listen(3000, () => console.log('Listening on port 3000'))
export default srv
