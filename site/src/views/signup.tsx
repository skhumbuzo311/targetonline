import './signup.css'

import { FunctionComponent, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

import * as authApi from "api/authentication";
import { User } from 'api/authentication/types';
import useApi from 'shared/utils/react_use_api';
import NotifyFailure from 'shared/utils/notify-failure';
import { CurrentUserContext } from 'store';

const Signup: FunctionComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [, setCurrentUser] = useContext(CurrentUserContext);

  const postSignup = useApi({
      action: () => authApi.postSignup(user),
      defer: true,
      onSuccess: (response: User) => {
        setCurrentUser(response);
        console.log('postSignup-response', response)
        navigate('/phone-number-verification') 
      },
      onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

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
            <div className="signup-container5">
              <input
                type="text"
                required
                autoFocus
                placeholder="First name"
                className="signup-textinput input"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({
                  ...user,
                  firstName: e.currentTarget.value
                })}
              />
              <input
                type="text"
                required
                autoFocus
                placeholder="Last name"
                className="signup-textinput1 input"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({
                  ...user,
                  lastName: e.currentTarget.value
                })}
              />
              <input
                type="text"
                required
                autoFocus
                placeholder="Phone number"
                className="signup-textinput2 input"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({
                  ...user,
                  phoneNumber: e.currentTarget.value
                })}
              />
              <input
                type="email"
                required
                autoFocus
                placeholder="Email"
                className="signup-textinput3 input"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({
                  ...user,
                  emailAddress: e.currentTarget.value
                })}
              />
              <input
                type="password"
                required
                autoFocus
                placeholder="Password"
                className="signup-textinput4 input"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({
                  ...user,
                  password: e.currentTarget.value
                })}
              />
              <button 
                autoFocus
                type="button"  
                className="signup-button button" 
                onClick={() => postSignup.execute()}>
                {postSignup.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Create account'}
              </button>
            </div>
            <div className="signup-container6">
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
