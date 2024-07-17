import React, { Component } from 'react'
import HeaderLogo from './Logo'
import HeaderTitle from './Title'
import Logout from './Logout'

import './index.scss'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <HeaderLogo />
        <HeaderTitle />
        <Logout />
      </header>
    )
  }
}
