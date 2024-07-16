import axios from 'axios'
import qs from 'qs'

/**
 * HTTP请求类，用于封装axios的POST和GET请求方法
 */
export default class HTTP {
  /**
   * 发送一个POST请求
   * @param {Object} options 请求配置选项，包括url、data、success和error
   * @param {String} options.url 请求的URL
   * @param {Object} options.data 请求的数据
   * @param {Function} options.success 请求成功时的回调函数
   * @param {Function} options.error 请求失败时的回调函数
   */
  async axiosPost(options) {
    try {
      // 使用axios发送POST请求，设置请求头为表单提交格式，并序列化数据
      const res = await axios({
        url: options.url,
        method: 'POST',
        // 表示是否在跨域请求中包含凭证（如cookies、HTTP认证及客户端SSL证明等）。设置为true表示包含凭证，设置为false表示不包含凭证，默认值为false。
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(options.data),
      })
      // 请求成功时，调用success回调，并传递响应数据
      options.success(res.data)
    } catch (err) {
      // 请求失败时，调用error回调，并传递错误对象
      options.error(err)
    }
  }

  /**
   * 发送一个GET请求
   * @param {Object} options 请求配置选项，包括url、success和error
   * @param {String} options.url 请求的URL
   * @param {Function} options.success 请求成功时的回调函数
   * @param {Function} options.error 请求失败时的回调函数
   */
  async axiosGet(options) {
    try {
      // 使用axios发送GET请求
      const res = await axios({
        url: options.url,
        method: 'GET',
        withCredentials: true,
      })
      // 请求成功时，调用success回调，并传递响应数据
      options.success(res.data)
    } catch (err) {
      // 请求失败时，调用error回调，并传递错误对象
      options.error(err)
    }
  }
}
