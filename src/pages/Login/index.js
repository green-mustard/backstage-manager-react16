import React, { Component } from 'react'
import Login from 'components/Login' // 这里使用了配置的路径别名components

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'login',
    }
  }
  render() {
    return (
      <h1>
        <Login />
      </h1>
    )
  }
}
