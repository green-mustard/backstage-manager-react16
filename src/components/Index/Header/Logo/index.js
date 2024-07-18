import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './index.scss'

export default class HeaderLogo extends Component {
  render() {
    return (
      <div className="header-logo-wrapper">
        <Link to="/course" className="logo-link"></Link>
      </div>
    )
  }
}
