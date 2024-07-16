import React, { Component } from 'react'
import Logo from './Logo'
import Form from './Form'

import './index.scss'

export default class Login extends Component {
  render() {
    const { history } = this.props
    return (
      <div className="login-container">
        <Logo />
        <Form history={history} />
      </div>
    )
  }
}
