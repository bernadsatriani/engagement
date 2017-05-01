import { renderFile } from 'pug'

const file = name => `./src/views/${name}.pug`
const redirect = redirect => `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://${redirect}/auth&response_type=code`

export default async ({ url, headers }, res, { query }, name) => {
  name = name || (url === '/' ? 'index' : url.substr(1).split('?')[0])
  const result = renderFile(file(name), {
    authUrl: redirect(headers.host),
    ...query,
    cache: true
  })
  res.end(result)
}
