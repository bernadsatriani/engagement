import URL from 'url-parse'
import R from 'ramda'

export const getPath = url => new URL(url).pathname
export const splitPath = R.split('/')
export const compact = R.filter(R.length)
export default R.pipe(getPath, splitPath, compact, R.head)
