import React, { Component } from 'react'
import NavItem from './NavItem'
import { NAV } from '../../../config/config'

import './index.scss'

/**
 * 侧边栏组件，用于显示导航项。
 *
 * @extends Component React组件
 */
export default class SideBar extends Component {
  /**
   * 渲染侧边栏组件。
   *
   * 通过遍历NAV数组生成导航项，每个导航项都是一个NavItem组件。
   * 使用map函数遍历数组时，index作为每个NavItem的key，用于React的虚拟DOM diff算法。
   *
   * @returns {React.Element} 返回侧边栏的虚拟DOM元素。
   */
  render() {
    const { curIndex, onNavItemClick } = this.props
    return (
      <aside className="side-bar">
        {NAV.map((item, index) => {
          return (
            <NavItem
              key={index}
              index={index}
              dataItem={item}
              curIndex={curIndex}
              onNavItemClick={onNavItemClick}
            />
          )
        })}
      </aside>
    )
  }
}
