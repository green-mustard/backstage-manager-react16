import React, { Component } from 'react'
import { NAV } from '../../config/config'
import LoginService from 'services/Login.js'
import HistoryContext from 'utils/HistoryContext'
import Header from 'components/Index/Header'
import SideBar from 'components/Index/SideBar'

/**
 * IndexPage 组件是应用程序的主页组件。
 * 它负责渲染主页的内容，并提供登录检查功能，以确保用户已登录。
 */
const loginService = new LoginService()
export default class IndexPage extends Component {
  /**
   * 设置组件的上下文类型为 HistoryContext，以便可以访问浏览器历史记录的推送方法。
   */
  static contextType = HistoryContext

  /**
   * 构造函数初始化组件状态。
   * @param {object} props - 组件的属性。
   */
  constructor(props) {
    super(props)
    // 初始化组件状态
    this.state = {
      name: 'index',
      curIndex: 0,
      field: NAV[0].field,
      title: NAV[0].title,
    }
  }

  /**
   * 异步检查用户登录状态。
   * 如果用户未登录（错误代码为10006），则将用户重定向到登录页面。
   */
  async loginCheck() {
    const result = await loginService.loginCheck()
    const errorCode = result.error_code
    if (errorCode === 10006) {
      this.context.push('/login')
    }
  }

  /**
   * 在组件挂载后调用 loginCheck 方法，进行登录状态检查。
   */
  componentDidMount() {
    this.loginCheck()
  }

  onNavItemClick(dataItem, index) {
    const { field, title } = dataItem
    this.setState({
      curIndex: index,
      field,
      title,
    })
  }
  /**
   * 渲染组件。
   * @returns {React.Element} - 返回一个 React 元素，代表组件应该在屏幕上渲染的内容。
   */
  render() {
    const { curIndex } = this.state
    return (
      <div className="container">
        <Header />
        <SideBar
          curIndex={curIndex}
          onNavItemClick={this.onNavItemClick.bind(this)}
        />
      </div>
    )
  }
}
