// @flow
import { pipeP } from 'ramda'
import getUsername from './url'
import calculate from './calculate'
import serve from './serve'

const app = pipeP(async (url: string) => getUsername(url), calculate)

export default async ({ url }: { url: string }, res: {}) => url === '/' ? serve(res) : app(url)
