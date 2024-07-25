import React, { Component } from 'react'
import { SLIDER_TH } from '../../../config/table_config'
import { getData } from 'utils/tool'
import HistoryContext from 'utils/HistoryContext'
import CommonService from 'services/Common'
import SliderService from 'services/Slider'
import ListTitle from 'components/Common/ListTitle'
import Table from 'components/Common/Table'

const sliderService = new SliderService()
const commonService = new CommonService()

export default class Slider extends Component {
  static contextType = HistoryContext
  constructor(props) {
    super(props)
    this.state = {
      title: '轮播图管理',
      sliderData: [],
    }
  }

  getSliderData = async () => {
    const res = await sliderService.getSliderData()
    const data = res.data
    const errorCode = res.error_code

    getData(
      errorCode,
      data,
      () => {
        this.setState({
          sliderData: res.data,
        })
      },
      () => {
        this.context.push('/404')
      },
    )
  }

  onClickStatusBtn = async cid => {
    const { sliderData } = this.state
    const { status } = sliderData.find(item => item.cid === cid)

    const confirm = window.confirm(
      `确定要${status ? '下架' : '上架'}该轮播图吗？`,
    )

    if (confirm) {
      const updateData = sliderData.map(item => {
        if (item.cid === cid) {
          item.status = item.status === 0 ? 1 : 0
        }
        return item
      })
      this.setState({
        sliderData: updateData,
      })

      const result = await commonService.changeStatus({
        id: cid,
        status: sliderData.find(item => item.cid === cid).status,
        field: 'SLIDER',
      })

      const errorCode = result.error_code
      if (errorCode !== 0) {
        const status = sliderData.find(item => item.cid === cid).status
        alert(status ? '该轮播图吗？下架失败' : '该轮播图上架失败')
      }
    }
  }

  componentDidMount() {
    this.getSliderData()
  }
  render() {
    const { title, sliderData } = this.state
    return (
      <div className="list-container">
        <ListTitle
          title={title}
          onRefreshData={() => {
            this.getSliderData()
          }}
        />
        <Table
          thData={SLIDER_TH}
          tbData={sliderData}
          onClickStatusBtn={this.onClickStatusBtn}
        />
      </div>
    )
  }
}
