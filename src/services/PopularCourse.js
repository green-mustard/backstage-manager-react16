import HTTP from 'utils/http'
import { API } from '../config/config'

const POPULAR_COURSE = API.POPULAR_COURSE

export default class PopularCourseService extends HTTP {
  getPopularCourseData = () => {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: POPULAR_COURSE.GET_POPULAR_COURSE_DATA,
        success(data) {
          resolve(data)
        },
        error(err) {
          alert('网络请求失败： ' + err)
        },
      })
    })
  }

  changePopularCourseStatus = data => {
    return new Promise((resolve, reject) => {
      this.axiosPost({
        url: POPULAR_COURSE.CHANGE_POPULAR_COURSE_STATUS,
        data,
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
