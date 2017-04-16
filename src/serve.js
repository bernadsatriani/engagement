import { readFileSync } from 'fs'

const path = './src/index.html'
const html = readFileSync(path, 'utf-8')

export default async res => {
  res.end(html)
}
