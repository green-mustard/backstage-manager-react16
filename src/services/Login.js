/**
 * 登录服务类，继承自HTTP类，用于处理登录相关的业务逻辑。
 * 通过axios库发送HTTP请求，实现用户登录功能。
 */
import HTTP from 'utils/http.js'
import { API } from '../config/config'

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
        url: API.LOGIN_ACTION,
        data: userInfo,
        success(data) {
          // 登录成功，解决Promise，将服务器返回的数据传递给调用者。
          resolve(data)
        },
        error(err) {
          // 登录失败，弹出错误提示，并重新加载页面。
          alert('网络请求失败')
          window.location.reload()
        },
      })
    })
  }
}
