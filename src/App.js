import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HistoryProvider } from 'utils/HistoryContext'

import IndexPage from './pages/Index'
import LoginPage from './pages/Login'

import CoursePage from 'pages/Index/Course'
import CourseTabPage from 'pages/Index/CourseTab'
import CrawlerPage from 'pages/Index/Crawler'
import PopularCoursePage from 'pages/Index/PopularCourse'
import SliderPage from 'pages/Index/Slider'
import TeacherPage from 'pages/Index/Teacher'
import ErrorPage from 'pages/Index/Error'

function App() {
  return (
    <Router>
      <HistoryProvider>
        <Switch>
          {/* Switch 中 Route 的顺序很重要。如果一个 Route 的 path 是另一个 Route 的前缀，那么更长的 path 应该放在前面。 */}
          <Route component={LoginPage} path="/login" />
          <Route
            path="/"
            render={props => (
              <IndexPage>
                <Switch>
                  <Route path="/course" component={CoursePage} />
                  <Route path="/popular_course" component={PopularCoursePage} />
                  <Route path="/slider" component={SliderPage} />
                  <Route path="/course_tab" component={CourseTabPage} />
                  <Route path="/crawler" component={CrawlerPage} />
                  <Route path="/teacher" component={TeacherPage} />
                  {/* 将 <Route component={ErrorPage} /> 放在 <Switch> 的最后面，是为了确保它只在没有任何其他 <Route> 能够匹配当前 URL 时才被渲染。这是作为“兜底”或“默认”路由来处理那些没有明确路径匹配的情况。 */}
                  <Route component={ErrorPage} />
                </Switch>
              </IndexPage>
            )}
          />
        </Switch>
      </HistoryProvider>
    </Router>
  )
}

export default App
