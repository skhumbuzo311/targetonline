import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.css'
import Store from './store'
import Home from './views/home'
import Login from './views/login'
import Signup from './views/signup'
import Partner from './views/partner'
import Consulting from './views/consulting'
import UIUXDesign from './views/ui-ux-design'
import Outsourcing from './views/outsourcing'
import Partnership from './views/partnership'
import SoftwareDevelopment from './views/software-development'

const App = () => {
  return (
    <Router>
      <Store>
        <Route component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={Signup} exact path="/signup" />
        <Route component={Partner} exact path="/partner" />
        <Route component={Consulting} exact path="/consulting" />
        <Route component={UIUXDesign} exact path="/ui-ux-design" />
        <Route component={Outsourcing} exact path="/outsourcing" />
        <Route component={Partnership} exact path="/partnership" />
        <Route component={SoftwareDevelopment} exact path="/software-development" />
      </Store>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
