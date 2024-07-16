import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/Index'
import LoginPage from './pages/Login'
import DetailPage from './pages/Index/Detail'
import ListPage from './pages/Index/List'
function App() {
  return (
    <Router>
      <Switch>
        {/* Switch 中 Route 的顺序很重要。如果一个 Route 的 path 是另一个 Route 的前缀，那么更长的 path 应该放在前面。 */}
        <Route component={LoginPage} path="/login" />
        <Route
          path="/"
          render={props => (
            <IndexPage>
              <Switch>
                <Route component={DetailPage} path="/sub/detail" />
                <Route component={ListPage} path="/sub/list" />
              </Switch>
            </IndexPage>
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
