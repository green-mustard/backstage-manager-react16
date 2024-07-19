/**
 * 导入HTTP模块，用于网络请求。
 * 导入API配置，用于获取API路径。
 */
import HTTP from 'utils/http'
import { API } from '../config/config'

/**
 * 定义常量COURSE，用于存储课程相关API路径。
 */
const COURSE = API.COURSE

/**
 * CourseService类继承自HTTP类，提供课程相关的服务功能。
 */
export default class CourseService extends HTTP {
  /**
   * 获取课程数据。
   *
   * 通过axios进行GET请求，获取课程数据。请求成功时解析返回的数据，
   * 请求失败时弹出错误提示。
   *
   * @returns {Promise} 返回一个Promise对象，用于异步处理课程数据。
   */
  getCourseData() {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: COURSE.GET_COURSE_DATA,
        success(data) {
          resolve(data)
        },
        error(err) {
          alert('网络请求失败： ' + err)
        },
      })
    })
  }
}
