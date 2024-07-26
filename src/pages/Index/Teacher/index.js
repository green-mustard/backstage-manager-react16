import React, { Component } from 'react'
import { getData } from 'utils/tool'
import { TEACHER_TH } from '../../../config/table_config'
import HistoryContext from 'utils/HistoryContext'
import TeacherService from 'services/Teacher'
import CommonService from 'services/Common'
import Table from 'components/Common/Table'
import ListTitle from 'components/Common/ListTitle'

import './index.scss'

const teacherService = new TeacherService()
const commonService = new CommonService()

export default class Teacher extends Component {
  static contextType = HistoryContext
  constructor(props) {
    super(props)
    this.state = {
      title: '老师管理',
      teacherData: [],
    }
  }

  getTeacherData = async () => {
    const res = await teacherService.getTeacherData()
    const data = res.data
    const errorCode = res.error_code
    getData(
      errorCode,
      data,
      () => {
        this.setState({
          teacherData: data,
        })
      },
      () => {
        this.context.push('/404')
      },
    )
  }

  onClickStatusBtn = async tid => {
    const { teacherData } = this.state
    const { status } = teacherData.find(item => item.tid === tid)

    const confirm = window.confirm(
      `确定要${status ? '下线' : '上线'}该老师吗？`,
    )
    if (confirm) {
      const updateData = teacherData.map(item => {
        if (item.tid === tid) {
          item.status = item.status === 0 ? 1 : 0
        }
        return item
      })
      this.setState({
        teacherData: updateData,
      })
    }
    const result = await commonService.changeStatus({
      id: tid,
      status: teacherData.find(item => item.tid === tid).status,
      field: 'TEACHER',
    })

    const errorCode = result.error_code
    if (errorCode !== 0) {
      const status = teacherData.find(item => item.tid === tid).status
      alert(status ? '该老师下线失败' : '该老师上线失败')
    }
  }

  componentDidMount() {
    this.getTeacherData()
  }
  render() {
    const { title, teacherData } = this.state
    return (
      <div className="list-container">
        <ListTitle title={title} onRefreshData={this.getTeacherData} />
        <Table
          thData={TEACHER_TH}
          tbData={teacherData}
          idField="tid"
          imgField="teacher-img"
          titleField="teacherName"
          desc="teacher-desc"
          onClickStatusBtn={this.onClickStatusBtn}
        />
      </div>
    )
  }
}
