import React, { Component } from 'react'
import LoginService from 'services/Login'
import { trimSpace, debounce } from 'utils/tool'
import HistoryContext from 'utils/HistoryContext'

import './index.scss'

const loginService = new LoginService()
export default class LoginForm extends Component {
  static contextType = HistoryContext // 静态属性指定 context 类型
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  /**
   * 异步检查登录状态的方法。
   * 该方法通过调用loginService的loginCheck函数来检查用户登录状态。
   * 如果检测到错误代码10007，表示用户已登录，則将页面重定向到首页。
   *
   * @async
   */
  async loginCheck() {
    // 等待登录状态检查的结果
    const result = await loginService.loginCheck()
    // 获取结果中的错误代码
    const errorCode = result.error_code
    // 如果错误代码为10007，表示用户已登录，重定向到首页
    if (errorCode === 10007) {
      this.context.push('/')
    }
  }
  // 这是包装后的防抖函数
  handleDebouncedInputChange = debounce((id, val) => {
    this.setState({
      [id]: trimSpace(val),
    })
  }, 300)

  // 使用 debounce 函数包装 onInputChange
  onInputChange = e => {
    const id = e.target.id
    const val = e.target.value
    this.handleDebouncedInputChange(id, val)
  }

  // 表单提交时的回调函数
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

    const errorCode = res.error_code
    const errorMsg = res.error_message

    if (errorCode !== 0) {
      alert(errorMsg + '--errorCode: ' + errorCode)
      return
    }

    alert('登录成功')
    //通过 this.context 访问到 history 对象
    this.context.push('/')
  }

  componentDidMount() {
    this.loginCheck()
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
