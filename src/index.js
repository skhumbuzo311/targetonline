import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.css'
import Outsourcing from './views/outsourcing'
import SoftwareDevelopment from './views/software-development'
import Consulting from './views/consulting'
import Home from './views/home'
import UIUXDesign from './views/ui-ux-design'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Outsourcing} exact path="/outsourcing" />
        <Route
          component={SoftwareDevelopment}
          exact
          path="/software-development"
        />
        <Route component={Consulting} exact path="/consulting" />
        <Route component={Home} exact path="/" />
        <Route component={UIUXDesign} exact path="/ui-ux-design" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
