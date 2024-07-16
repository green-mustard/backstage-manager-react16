import React, { Component } from 'react'
import './index.scss'

import Title from '../Form/Title'
import LoginForm from '../Form/LoginForm'

export default class Form extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <Title />
        <LoginForm />
      </div>
    )
  }
}
