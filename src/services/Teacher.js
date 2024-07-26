import HTTP from 'utils/http'
import { API } from '../config/config'

const TEACHER = API.TEACHER

export default class teacherService extends HTTP {
  getTeacherData = () => {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: TEACHER.GET_TEACHER_DATA,
        success(responseData) {
          resolve(responseData)
        },
        error(err) {
          alert('网络请求失败： ' + err)
        },
      })
    })
  }
}
