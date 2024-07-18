const BASE_URL = 'http://localhost:3000/admin/'

const API = {
  LOGIN_ACTION: BASE_URL + 'login_action',
  LOGIN_CHECK: BASE_URL + 'login_check',
  LOGOUT: BASE_URL + 'logout',
}

const NAV = [
  {
    field: 'course',
    title: '课程管理', //课程分类选择以及课程上下架
  },
  {
    field: 'popular_course',
    title: '热门课程', // 推荐课程的上下架
  },
  {
    field: 'slider',
    title: '轮播图管理', // 轮播图数据上下线
  },
  {
    field: 'course_tab',
    title: '课程标签管理', // 课程标签数据上下线
  },
  {
    field: 'teacher',
    title: '老师管理', // 老师的上下线，明星老师的管理
  },
  {
    field: 'crawler',
    title: '数据管理', // 爬取各种数据
  },
]

export { API, NAV }
