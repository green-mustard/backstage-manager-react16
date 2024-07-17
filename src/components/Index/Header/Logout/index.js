import React, { Component } from 'react'
import LoginService from 'services/Login'
import HistoryContext from 'utils/HistoryContext'

import './index.scss'

const loginService = new LoginService()
export default class Logout extends Component {
  static contextType = HistoryContext

  async onLogout() {
    const comfirm = window.confirm('是否退出登录？')
    if (comfirm) {
      const result = await loginService.logout()
      console.log(result)
      const errorCode = result.error_code
      const errorMsg = result.error_message
      if (errorCode === 0 && errorMsg === 'Logout success') {
        this.context.push('/login')
      }
    }
  }
  render() {
    return (
      <span className="header-logout" onClick={() => this.onLogout()}>
        退出登录
      </span>
    )
  }
}
