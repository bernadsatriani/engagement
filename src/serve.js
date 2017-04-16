import { readFileSync } from 'fs'

const path = './index.html'
const html = readFileSync(path)

export default async res => res.end(html)
