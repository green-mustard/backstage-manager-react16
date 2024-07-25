import React, { Component } from 'react'
import { getData } from 'utils/tool'
import { COURSE_TH } from '../../../config/table_config'
import ListTitle from 'components/Common/ListTitle'
import CourseService from 'services/Course'
import CommonService from 'services/Common'
import HistoryContext from 'utils/HistoryContext'
import Table from 'components/Common/Table'

// 创建一个CourseService实例用于课程数据获取
const courseService = new CourseService()
const commonService = new CommonService()

/**
 * 课程组件，继承自React.Component
 * 提供了获取课程数据和渲染课程列表的功能
 */
export default class Course extends Component {
  // 使用HistoryContext提供历史记录管理的上下文
  static contextType = HistoryContext

  constructor(props) {
    super(props)
    this.state = {
      title: '课程列表',
      courseData: [],
      tabData: [],
    }
  }

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
    /**
     * 获取数据并处理的函数
     *
     * 此函数用于从外部源获取数据，并根据这些数据更新组件状态。它处理两种情况：
     * 1. 成功获取数据：它将对获取的课程数据进行处理，为每个课程分配一个分类标题，
     *    然后更新组件状态以反映这些新数据。
     * 2. 获取数据失败：它将导航到一个错误页面（404页面），表示未找到数据。
     *
     * @param {number} errorCode - 错误代码，用于指示数据获取操作的成功与否。
     * @param {Object} data - 包含课程数据和标签数据的对象。
     * @param {Function} successCallback - 成功获取数据时调用的回调函数。
     * @param {Function} errorCallback - 获取数据失败时调用的回调函数。
     */
    getData(
      errorCode,
      data,
      () => {
        // 解构数据以获得课程数据和标签数据
        const { courseData, tabData } = data

        // 遍历课程数据，为每个课程分配一个分类标题
        // 格式化获取到的课程标签数据
        courseData.forEach(courseItem => {
          // 如果课程没有分类，将其标题设置为'未分类'
          if (courseItem.field === 0) {
            courseItem.fieldTitle = '未分类'
          } else {
            // 遍历标签数据，找到与课程分类对应的标签名称
            tabData.forEach(tabItem => {
              if (courseItem.field === tabItem.id) {
                courseItem.fieldTitle = tabItem.tabName
              }
            })
          }
        })

        // 更新组件状态以反映处理后的课程数据
        this.setState({
          courseData,
          tabData,
        })
      },
      () => {
        // 导航到404页面，表示未找到数据
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

  // 定义刷新数据的函数
  onRefreshData() {
    // 在函数中再次调用获取数据的方法
    this.getCourseData()
  }

  onSelectChange = async (item, selectIndex, cid) => {
    const { courseData } = this.state
    courseData[selectIndex].field = item.id
    courseData[selectIndex].fieldTitle = item.tabName

    this.setState({
      courseData,
    })
    const result = await courseService.changeCourseTab({
      cid,
      field: item.id,
    })

    const errorCode = result.error_code
    if (errorCode !== 0) {
      alert('网络请求失败： ' + errorCode)
    }
  }

  /**
   * 异步方法：根据课程ID改变课程的状态（上架或下架）
   * @param {number} cid - 课程ID
   */
  onClickStatusBtn = async cid => {
    // 获取当前状态
    const { courseData } = this.state
    const { status } = courseData.find(item => item.cid === cid)
    // 确认操作
    const confirm = window.confirm(
      `确定要${status ? '下架' : '上架'}该课程吗？`,
    )

    // 如果用户确认操作
    if (confirm) {
      // 更新课程数据中的状态
      const updateData = courseData.map(item => {
        if (item.cid === cid) {
          // 状态切换
          item.status = item.status === 0 ? 1 : 0
        }
        return item
      })
      // 设置新的状态到组件状态
      this.setState({
        courseData: updateData,
      })

      // 调用服务层方法实际改变课程状态
      const result = await commonService.changeStatus({
        id: cid,
        status: courseData.find(item => item.cid === cid).status,
        field: 'COURSE',
      })
      // 检查操作结果
      const errorCode = result.error_code
      if (errorCode !== 0) {
        // 如果操作失败，提醒用户
        const status = courseData.find(item => item.cid === cid).status
        console.log(status)
        alert(status ? '该课程下架失败' : '该课程上架失败')
      }
    }
  }
  /**
   *
   *
   * 渲染组件
   * 返回课程列表的页面结构
   * @returns {ReactElement} 页面结构
   */
  render() {
    const { title, courseData, tabData } = this.state
    return (
      <div className="list-container">
        <ListTitle
          title={title}
          onRefreshData={() => {
            this.onRefreshData()
          }}
        />
        {/* <ListTitle
          title={title}
          onRefreshData={this.onRefreshData.bind(this)}
        /> */}
        <Table
          thData={COURSE_TH}
          tbData={courseData}
          tabData={tabData}
          titleField="title"
          studentCount="studentCount"
          onSelectChange={this.onSelectChange}
          onClickStatusBtn={this.onClickStatusBtn}
        />
      </div>
    )
  }
}
