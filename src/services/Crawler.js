import HTTP from 'utils/http.js'

import { API } from '../config/config'

const CRAWLER = API.CRAWLER

export default class CrawlerService extends HTTP {
  crawlAction = apiName => {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: CRAWLER.CRAWL_ACTION,
        data: { apiName },
        success(responseData) {
          resolve(responseData)
        },
        error(err) {
          alert('网络请求失败： ' + err)
        },
      })
    })
  }
}
