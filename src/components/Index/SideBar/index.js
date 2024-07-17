import React, { Component } from 'react'
import NavItem from './NavItem'
import { NAV } from '../../../config/config'

import './index.scss'

export default class SideBar extends Component {
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
