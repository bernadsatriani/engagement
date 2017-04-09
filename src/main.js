import micro, { createError } from 'micro'
import R from 'ramda'
import getUsername from './url'
import calculate from './calculate'

const app = R.pipeP(
  async o => R.prop('url', o),
  getUsername,
  calculate,
  R.toString
)

const srv = micro(app)
srv.listen(3000, () => console.log('Listening on port 3000'))
export default srv
