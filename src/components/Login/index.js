import React, { Component } from 'react'
import Logo from './Logo'
import Form from './Form'

import './index.scss'

export default class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <Logo />
        <Form />
      </div>
    )
  }
}
