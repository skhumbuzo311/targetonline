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

const PhoneNumberVerification: FunctionComponent = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext) 
  const [phoneNumberVerificationCodeSent, setPhoneNumberVerificationCodeSent] = useState(false);

  const sendPhoneNumberVerificationCode = useApi({
      action: () => authApi.sendPhoneNumberVerificationCode(currentUser),
      defer: true,
      onSuccess: async (response: User) => {
        setCurrentUser(response);

        setPhoneNumberVerificationCodeSent(true);   

        toast.success(`Phone number verification code sent to: ${response.phoneNumber}`)
      },
      onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

  const verifyPhoneNumber = useApi({
    action: () => authApi.verifyPhoneNumber(currentUser),
    defer: true,
    onSuccess: async (response: User) => {
      setCurrentUser(response)

      localStorage.setItem('ayoba-market-place-user', JSON.stringify(response));

      toast.success(`Phone number verified successfully`)

      navigate('/');
    },
    onError: (error: any) => NotifyFailure(error.response, error.message)
}, [])

  return (
    <div className="login-container">
      <Helmet>
        <title>Phone Verfication</title>
        <meta property="og:title" content="Login - Target Online Pty Ltd" />
      </Helmet>
      <div className="login-container1">
        <div className="login-container2"></div>
        <div className="login-container3">
          <h1 className="login-text">Phone Verfication</h1>
          <h1 className="login-text1">
            {phoneNumberVerificationCodeSent
              ? 'Enter verification code sent to you below'
              : 'Enter phone number where we will send you your password verification code'
            }
          </h1>
          <div className="login-container4">
            {!phoneNumberVerificationCodeSent && (
              <React.Fragment>
                <input
                  type="text"
                  required
                  placeholder="Phone number"
                  value={currentUser.phoneNumber}
                  className="login-textinput input"
                  onChange={e => setCurrentUser({
                    ...currentUser,
                    phoneNumber: e.currentTarget.value
                  })}
                />
                <button 
                    type="button" 
                    className="login-button button" 
                    disabled={sendPhoneNumberVerificationCode.inProgress}
                    onClick={() => sendPhoneNumberVerificationCode.execute()}
                  >
                    {sendPhoneNumberVerificationCode.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Send Verification Code'}
                  </button>
                </React.Fragment>
            )}
            {phoneNumberVerificationCodeSent && (
              <React.Fragment>
                <input
                  type="text"
                  required
                  autoComplete='false'
                  placeholder="Phone Verfication Code"
                  className="login-textinput input"
                  onChange={e => setCurrentUser({
                    ...currentUser,
                    phoneVerificationCode: e.currentTarget.value
                  })}
                />
                <button 
                    type="button" 
                    className="login-button button" 
                    disabled={verifyPhoneNumber.inProgress}
                    onClick={() => verifyPhoneNumber.execute()}
                  >
                    {verifyPhoneNumber.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Verify Phone Number'}
                  </button>
                  <button 
                    type="button" 
                    className="login-button button" 
                    disabled={sendPhoneNumberVerificationCode.inProgress}
                    onClick={() => sendPhoneNumberVerificationCode.execute()}
                  >
                    {sendPhoneNumberVerificationCode.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Resend Verification Code'}
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

export default PhoneNumberVerification
