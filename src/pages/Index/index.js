import React, { Component } from 'react'
import { Link } from 'react-router-dom'
/**
 * 创建IndexPage 组件（类式组件）
 * 该组件作为应用程序的主页，负责渲染主页的内容。
 */
export default class IndexPage extends Component {
  /**
   * 构造函数
   * @param {object} props - 组件的属性，由父组件传递给本组件。
   */
  constructor(props) {
    super(props)
    // 初始化组件状态
    this.state = {
      name: 'index',
    }
  }

  /**
   * 渲染方法
   * @returns {React.Element} - 返回一个 React 元素，代表组件应该在屏幕上渲染的内容。
   */
  render() {
    const { children } = this.props

    // 渲染一个 h1 标签，显示“Index page”
    return (
      <div>
        <ul>
          <li>
            <Link to="/sub/detail">详情页</Link>
          </li>
          <li>
            <Link to="/sub/list">列表页</Link>
          </li>
        </ul>
        {children}
      </div>
    )
  }
}
