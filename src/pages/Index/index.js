import React, { Component } from 'react'
import { NAV } from '../../config/config'
import LoginService from 'services/Login.js'
import HistoryContext from 'utils/HistoryContext'
import Header from 'components/Index/Header'
import SideBar from 'components/Index/SideBar'
import Container from 'components/Index/Container'

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
   * 如果用户未登录（错误代码为10006），则将用户重定向到登录页面， 如果已登录则重定向到course页面。
   */
  async loginCheck() {
    const result = await loginService.loginCheck()
    const errorCode = result.error_code
    if (errorCode === 10006) {
      this.context.push('/login')
      return
    }
    this.context.push('/slider')
  }

  /**
   * 在组件挂载后调用 loginCheck 方法，进行登录状态检查。
   */
  async componentDidMount() {
    this.loginCheck()
  }

  /**
   * 处理导航栏项目点击事件。
   * @param {object} dataItem - 点击的项目的数据对象。
   * @param {number} index - 点击的项目的索引。
   */
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
    // 从组件状态中提取当前索引
    /** 
     bind(this)的作用就是确保onNavItemClick方法在任何时候被调用时，它的this都指向React组件实例。这样，在onNavItemClick方法中，this.state.curIndex就可以正确地获取到当前索引。
    */
    const { curIndex } = this.state
    const { children } = this.props
    return (
      <div className="container">
        <Header />
        <SideBar
          curIndex={curIndex}
          onNavItemClick={this.onNavItemClick.bind(this)}
        />
        <Container children={children} />
      </div>
    )
  }
}
