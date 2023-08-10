import React from 'react'

import { Helmet } from 'react-helmet'

import './login.css'

const Login = (props) => {
  return (
    <div className="login-container">
      <Helmet>
        <title>Login - Target Online Pty Ltd</title>
        <meta property="og:title" content="Login - Target Online Pty Ltd" />
      </Helmet>
      <div className="login-container1">
        <div className="login-container2"></div>
        <div className="login-container3">
          <h1 className="login-text">Login</h1>
          <h1 className="login-text1">Welcome to Target Online Pty Ltd</h1>
          <div className="login-container4">
            <input
              type="text"
              required
              placeholder="Phone number"
              className="login-textinput input"
            />
            <input
              type="password"
              required
              autoFocus
              placeholder="Password"
              className="login-textinput1 input"
            />
            <button type="button" className="login-button button">
              Login
            </button>
            <div className="login-container5">
              <span className="login-text2">Create account </span>
              <span className="login-text3">Reset password </span>
            </div>
            <div className="login-profile">
              <img
                alt="profile"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/0c644282-2675-40e3-b1f6-d5c6c98aaa81/8a36294c-7fa8-440e-8f27-65b41582cf17?org_if_sml=118130"
                className="login-image"
              />
              <span className="login-text4">Target Online Pty Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
