import URL from 'url-parse'

export default class UrlParser {
  constructor (url) {
    this.url = new URL(url)
  }
  get valid () {
    return this.url.pathname.length > 1 &&
      this.url.pathname.split('/').filter(s => s.length).length === 1
  }
  get username () {
    return this.url.pathname.substr(1)
  }
}
