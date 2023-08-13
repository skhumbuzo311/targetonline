import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './signup.css'

const Signup = (props) => {
  return (
    <div className="signup-container">
      <Helmet>
        <title>Signup - Target Online Pty Ltd</title>
        <meta property="og:title" content="Signup - Target Online Pty Ltd" />
      </Helmet>
      <div className="signup-container1">
        <div className="signup-container2"></div>
        <div className="signup-container3">
          <h1 className="signup-text">Create Account</h1>
          <h1 className="signup-text1">Welcome to Target Online Pty Ltd</h1>
          <div className="signup-container4">
            <input
              type="text"
              required
              autoFocus
              placeholder="First name"
              className="signup-textinput input"
            />
            <input
              type="text"
              required
              autoFocus
              placeholder="Last name"
              className="signup-textinput1 input"
            />
            <input
              type="text"
              required
              autoFocus
              placeholder="Phone number"
              className="signup-textinput2 input"
            />
            <input
              type="email"
              required
              autoFocus
              placeholder="Email"
              className="signup-textinput3 input"
            />
            <input
              type="password"
              required
              autoFocus
              placeholder="Password"
              className="signup-textinput4 input"
            />
            <button type="button" autoFocus className="signup-button button">
              Create account
            </button>
            <div className="signup-container5">
              <Link to="/login" className="signup-navlink">
                Login
              </Link>
            </div>
            <Link to="/" className="signup-navlink1">
              <div className="signup-profile">
                <span className="signup-text2">Home</span>
              </div>
            </Link>
            <div className="signup-profile1">
              <img
                alt="profile"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/0c644282-2675-40e3-b1f6-d5c6c98aaa81/8a36294c-7fa8-440e-8f27-65b41582cf17?org_if_sml=118130"
                className="signup-image"
              />
              <span className="signup-text3">Target Online Pty Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
