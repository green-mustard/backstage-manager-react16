import React, { Component } from 'react'
import { CRAWLER_TH } from '../../../config/table_config'
import CrawlerService from 'services/Crawler'
import ListTitle from 'components/Common/ListTitle'
import crawlerData from '../../../config/crawler_config'
import Table from 'components/Common/Table'

const crawlerService = new CrawlerService()

export default class Crawler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '数据爬取管理',
      crawlerData,
    }
  }

  onCrawlAction = (apiName, index) => {
    const { crawlerData } = this.state
    const newData = [...crawlerData] // 创建一个新的数组副本，避免直接修改原始状态
    newData[index].loading = true // 更新指定索引的 loading 状态

    this.setState(
      {
        crawlerData: newData,
      },
      async () => {
        try {
          const result = await crawlerService.crawlAction(apiName)
          const errorCode = result.error_code
          if (errorCode === 0) {
            alert('数据爬取成功')
            this.setState(prevState => {
              //prevState 是当前状态的引用，它包含this.state的当前值
              const updatedData = [...prevState.crawlerData]
              updatedData[index].loading = false
              return { crawlerData: updatedData }
            })
          } else {
            // 如果有错误码，也应将 loading 设置为 false
            alert(`数据爬取失败, errorCode: ${errorCode}`)
            this.setState(prevState => {
              const updatedData = [...prevState.crawlerData]
              updatedData[index].loading = false
              return { crawlerData: updatedData }
            })
          }
        } catch (error) {
          // 在这里可以处理错误情况，比如重置 loading 状态
          this.setState(prevState => {
            const updatedData = [...prevState.crawlerData]
            updatedData[index].loading = false
            return { crawlerData: updatedData }
          })
        }
      },
    )
  }

  render() {
    const { title } = this.state
    return (
      <div className="list-container">
        <ListTitle title={title} />
        <Table
          thData={CRAWLER_TH}
          tbData={crawlerData}
          onCrawlAction={this.onCrawlAction}
        />
      </div>
    )
  }
}
