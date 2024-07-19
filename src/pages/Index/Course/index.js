import React, { Component } from 'react'
import { getData } from 'utils/tool'
import { COURSE_TH } from '../../../config/table_config'
import ListTitle from 'components/Commen/ListTitle'
import CourseService from 'services/Course'
import HistoryContext from 'utils/HistoryContext'
import Table from 'components/Commen/Table'

import './index.scss'

// 创建一个CourseService实例用于课程数据获取
const courseService = new CourseService()

/**
 * 课程组件，继承自React.Component
 * 提供了获取课程数据和渲染课程列表的功能
 */
export default class Course extends Component {
  // 使用HistoryContext提供历史记录管理的上下文
  static contextType = HistoryContext

  /**
   * 异步获取课程数据
   * 使用courseService的getCouseData方法来获取数据
   * 如果获取数据失败，则导航到404页面
   */
  async getCourseData() {
    // 异步获取课程数据
    const res = await courseService.getCourseData()
    const data = res.data
    const errorCode = res.error_code

    // 使用utils/tool中的getData函数获取数据或跳转404页面
    getData(
      errorCode,
      data,
      () => {
        console.log(data)
      },
      () => {
        this.context.push('/404')
      },
    )
  }

  /**
   * 组件挂载后调用的方法
   * 用于初始化数据获取
   */
  componentDidMount() {
    this.getCourseData()
  }

  /**
   * 渲染组件
   * 返回课程列表的页面结构
   * @returns {ReactElement} 页面结构
   */
  render() {
    return (
      <div className="list-container">
        <ListTitle title="课程列表" />
        <Table thData={COURSE_TH} />
      </div>
    )
  }
}
