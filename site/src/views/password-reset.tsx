import './login.css'

import React, { FunctionComponent, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

import { CurrentUserContext } from "store";
import { User } from 'api/authentication/types';
import useApi from 'shared/utils/react_use_api';
import * as authApi from "api/authentication";
import NotifyFailure from 'shared/utils/notify-failure';

const PasswordReset: FunctionComponent = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>({
    phoneNumber: ''
  });
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
  const [passwordResetVerificationCodeSent, setPasswordResetVerificationCodeSent] = useState(false);

  const requestPasswordResetVerificationCode = useApi({
    action: () => authApi.requestPasswordResetVerificationCode(userDetails),
    defer: true,
    onSuccess: async (response: User) => {
      setUserDetails(response);

      setPasswordResetVerificationCodeSent(true);

      toast.success(`Password reset verification code sent to: ${response.phoneNumber}`)
    },
    onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

  const passwordResetRequest = useApi({
    action: () => authApi.passwordResetRequest(userDetails),
    defer: true,
    onSuccess: async (response: User) => {
      setCurrentUser(response)

      localStorage.setItem('ayoba-market-place-user', JSON.stringify(response));

      toast.success(`Password has been reset successfully`)

      navigate('/');
    },
    onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

  return (
    <div className="login-container">
      <Helmet>
        <title>Password Reset</title>
        <meta property="og:title" content="Login - Target Online Pty Ltd" />
      </Helmet>
      <div className="login-container1">
        <div className="login-container2"></div>
        <div className="login-container3">
          <h1 className="login-text">Password Reset</h1>
          <h1 className="login-text1">
            {passwordResetVerificationCodeSent
              ? 'Enter verification code sent to you and your new password below'
              : 'Enter phone number where we will send you your password verification code'
            }
          </h1>
          <div className="login-container4">
            {!passwordResetVerificationCodeSent && (
              <React.Fragment>
                <input
                  type="text"
                  required
                  placeholder="Phone number"
                  className="login-textinput input"
                  onChange={e => setUserDetails({
                    ...userDetails,
                    phoneNumber: e.currentTarget.value
                  })}
                />
                <button
                  type="button"
                  className="login-button button"
                  disabled={requestPasswordResetVerificationCode.inProgress}
                  onClick={() => requestPasswordResetVerificationCode.execute()}
                >
                  {requestPasswordResetVerificationCode.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Send Verification Code'}
                </button>
              </React.Fragment>
            )}
            {passwordResetVerificationCodeSent && (
              <React.Fragment>
                <input
                  type="text"
                  required
                  autoComplete='false'
                  placeholder="Password Verfication Code"
                  className="login-textinput input"
                  onChange={e => setUserDetails({
                    ...userDetails,
                    passwordResetVerificationCode: e.currentTarget.value
                  })}
                />
                <input
                  type="password"
                  required
                  autoComplete='false'
                  placeholder="New Password"
                  className="login-textinput input"
                  onChange={e => setUserDetails({
                    ...userDetails,
                    password: e.currentTarget.value
                  })}
                />
                <button
                  type="button"
                  className="login-button button"
                  disabled={passwordResetRequest.inProgress}
                  onClick={() => passwordResetRequest.execute()}
                >
                  {passwordResetRequest.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Reset Password'}
                </button>
              </React.Fragment>
            )}
            <div className="login-container5">
              <Link to="/login" className="login-text2">
                Account login
              </Link>
              <Link to="/signup" className="login-text3">
                Create account
              </Link>
            </div>
            <div className="login-profile">
              <Link to="/" className="login-navlink">
                Home
              </Link>
            </div>
            <div className="login-profile1">
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

export default PasswordReset
