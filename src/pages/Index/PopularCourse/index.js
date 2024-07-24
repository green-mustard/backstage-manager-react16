import React, { Component } from 'react'
import { POPULAR_COURSE_TH } from '../../../config/table_config'
import PopularCourseService from 'services/PopularCourse'
import Table from 'components/Common/Table'
import ListTitle from 'components/Common/ListTitle'

import './index.scss'

const popularCourseService = new PopularCourseService()

export default class PopularCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '热门课程管理',
      popularCourseData: [],
    }
  }

  getPopularCourseData = async () => {
    const res = await popularCourseService.getPopularCourseData()
    this.setState({
      popularCourseData: res.data,
    })
  }
  changeStatus = async cid => {
    const { popularCourseData } = this.state
    const { status } = popularCourseData.find(item => item.cid === cid)

    const confirm = window.confirm(
      `确定要${status ? '下架' : '上架'}该课程吗？`,
    )

    if (confirm) {
      const updateData = popularCourseData.map(item => {
        if (item.cid === cid) {
          item.status = item.status === 0 ? 1 : 0
        }
        return item
      })
      this.setState({
        popularCourseData: updateData,
      })

      const result = await popularCourseService.changePopularCourseStatus({
        cid,
        status: popularCourseData.find(item => item.cid === cid).status,
      })

      const errorCode = result.error_code
      if (errorCode !== 0) {
        const status = popularCourseData.find(item => item.cid === cid).status
        alert(status ? '该课程下架失败' : '该课程上架失败')
      }
    }
  }

  componentDidMount() {
    this.getPopularCourseData()
  }

  render() {
    const { title, popularCourseData } = this.state

    return (
      <div className="list-container">
        <ListTitle
          title={title}
          onRefreshData={() => {
            this.getPopularCourseData()
          }}
        />
        <Table
          thData={POPULAR_COURSE_TH}
          tbData={popularCourseData}
          titleField="courseName"
          studentCount="studentsNumber"
          changeStatus={this.changeStatus}
        />
      </div>
    )
  }
}
