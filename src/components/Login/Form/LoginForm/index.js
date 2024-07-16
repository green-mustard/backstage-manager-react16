import React, { Component } from 'react'
import LoginService from 'services/Login'
import { trimSpace } from 'utils/tool'
import './index.scss'

const loginService = new LoginService()
export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    const timer = null
  }
  onInputChange(e) {
    const id = e.target.id
    const val = e.target.value
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState({
        [id]: val,
      })
    }, 300)
  }

  async onLoginSubmit(e) {
    const { username, password } = this.state
    e.preventDefault()

    if (trimSpace(username).length <= 0) {
      alert('用户名不能为空')
      return
    } else if (trimSpace(password).length <= 0) {
      alert('密码不能为空')
      return
    }
    const res = await loginService.loginAction({
      username: trimSpace(username),
      password: trimSpace(password),
    })
    console.log(res)
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <form onSubmit={e => this.onLoginSubmit(e)}>
          <div className="input-box">
            <label htmlFor="username" className="iconfont icon-user"></label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="管理员用户名"
              onChange={e => this.onInputChange(e)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password" className="iconfont icon-lock"></label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="管理员密码"
              onChange={e => this.onInputChange(e)}
            />
          </div>
          <div className="input-box">
            <button className="btn btn-primary">登录后台</button>
          </div>
        </form>
      </div>
    )
  }
}
