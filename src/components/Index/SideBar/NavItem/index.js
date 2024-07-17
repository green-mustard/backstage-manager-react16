import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

/**
 * 导航项组件，用于渲染导航栏中的一个可点击的导航项。
 * 该组件根据当前导航项是否被选中，动态改变其样式。
 * 当导航项被点击时，会触发一个回调函数，用于处理导航项点击事件。
 */
export default class NavItem extends Component {
  /**
   * 渲染导航项。
   *
   * @returns {JSX.Element} 返回导航项的JSX元素。
   */
  render() {
    // 解构获取当前导航项的属性
    const { curIndex, index, dataItem, onNavItemClick } = this.props

    // 根据当前导航项是否被选中，添加相应的CSS类名
    return (
      <div className={`nav-item ${index === curIndex ? 'nav-current' : ''}`}>
        <Link
          // 导航链接的目标路径
          to={`/${dataItem.field}`}
          // 点击导航项时的处理函数
          onClick={() => onNavItemClick(dataItem, index)}
        >
          {dataItem.title}
          <i className="iconfont icon-arrow-right"></i>
        </Link>
      </div>
    )
  }
}
