import './login.css'

import { FunctionComponent, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

import { CurrentUserContext } from "store";
import { User } from 'api/authentication/types';
import useApi from 'shared/utils/react_use_api';
import * as authApi from "api/authentication";
import NotifyFailure from 'shared/utils/notify-failure';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<any>(null);
  const { currentUser } = useContext(CurrentUserContext);

 // currentUser.current = currentUser

  const postLogin = useApi({
      action: () => authApi.postLogin(userLogin),
      defer: true,
      onSuccess: async (response: User) => {
        currentUser.current = response;

        localStorage.setItem('targetOnlineUser', JSON.stringify(response));

        toast.success(`Welcome back ${response.firstName}`)

        navigate('/partner');
      },
      onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

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
              onChange={(e: React.FormEvent<HTMLInputElement>) => setUserLogin({
                ...userLogin,
                phoneNumber: e.currentTarget.value
              })}
            />
            <input
              type="password"
              required
              autoFocus
              placeholder="Password"
              className="login-textinput1 input"
              onChange={(e: React.FormEvent<HTMLInputElement>) => setUserLogin({
                ...userLogin,
                password: e.currentTarget.value
              })}
            />
            <button 
              type="button" 
              className="login-button button" 
              onClick={() => postLogin.execute()}
            >
              {postLogin.inProgress ? <CircularProgress size={20} color="inherit" /> : 'Login'}
            </button>
            <div className="login-container5">
              <Link to="/signup" className="login-text2">
                Create account 
              </Link>
              <span className="login-text3">Reset password </span>
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

export default Login
