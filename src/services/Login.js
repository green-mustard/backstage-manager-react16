/**
 * 登录服务类，继承自HTTP类，用于处理登录相关的业务逻辑。
 * 通过axios库发送HTTP请求，实现用户登录功能。
 */
import HTTP from 'utils/http.js'
import { API } from '../config/config'

const LOGIN = API.LOGIN

export default class LoginService extends HTTP {
  /**
   * 执行登录操作。
   *
   * @param {Object} userInfo 用户信息对象，包含登录所需的用户名和密码等信息。
   * @returns {Promise} 返回一个Promise对象，用于处理异步操作的结果。
   */
  loginAction(userInfo) {
    return new Promise((resolve, reject) => {
      /**
       * 发送POST请求，尝试登录。
       *
       * @param {Object} config 请求配置，包括URL和数据等信息。
       */
      this.axiosPost({
        url: LOGIN.LOGIN_ACTION,
        data: userInfo,
        success(data) {
          // 登录成功，解决Promise，将服务器返回的数据传递给调用者。
          resolve(data)
        },
        error(err) {
          // 登录失败，弹出错误提示，并重新加载页面。
          alert('网络请求失败')
        },
      })
    })
  }

  /**
   * 检查用户登录状态
   *
   * 该函数通过发送一个HTTP GET请求到指定的API endpoint来检查用户的登录状态。
   * 它返回一个Promise，允许调用者以异步的方式处理登录检查的结果。
   * 如果检查成功，Promise将解析为检查结果的数据；如果检查失败，将显示一个错误警报并重新加载页面。
   *
   * @returns {Promise} 返回一个Promise对象，解析值为登录检查的结果数据。
   */
  loginCheck() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: LOGIN.LOGIN_CHECK,
        success(data) {
          resolve(data)
        },

        error(err) {
          alert('网络请求失败')
          window.location.reload()
        },
      })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: LOGIN.LOGOUT,
        success(data) {
          resolve(data)
        },
        error(err) {
          alert('网络请求失败')
          window.location.reload()
        },
      })
    })
  }
}
