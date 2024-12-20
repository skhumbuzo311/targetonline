import './partner.css'

import { useState, useContext, FunctionComponent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from "@material-ui/core/CircularProgress";

import { CurrentUserContext } from "store";
import { isNullOrEmpty } from 'shared/utils/string';
import useApi from 'shared/utils/react_use_api';
import * as settingsApi from "api/settings";
import { User } from 'api/authentication/types';
import { toast } from 'react-toastify';
import NotifyFailure from 'shared/utils/notify-failure';

const Partner: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const [isCloseBtnClicked, setCloseBtnClicked] = useState(false);
  const [avatarMouseEntered, onAvatarMouseEnter] = useState(false);
  const [profileMouseEntered, onProfileMouseEnter] = useState(false);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    if (isNullOrEmpty(currentUser.id)) navigate('/login')
    else document.getElementById('partner-blog')!.scrollIntoView();
  }, [])

  const updateAvatar = useApi({
    action: (file: File) => {
      const formData = new FormData();

      formData.append('formFile', file)
      formData.append('createdByUserId', currentUser.id)

      return settingsApi.updateAvatar(formData)
    },
    defer: true,
    onSuccess: (response: User) => {
      setCurrentUser(response);
      localStorage.setItem('targetOnlineUser', JSON.stringify(response));
      toast.success('Avatar updated successfully');
    },
    onError: (error: any) => NotifyFailure(error.response, error.message)
  }, [])

  useEffect(() => document.getElementById("partner-container")!.scrollIntoView(), [])

  return (
    <div className="partner-container" id="partner-container">
      <Helmet>
        <title>Partner - Target Online Pty Ltd</title>
        <meta property="og:title" content="Partner - Target Online Pty Ltd" />
      </Helmet>
      <header data-thq="thq-navbar" className="consulting-navbar-interactive">
        <Link to="/" className="consulting-navlink">
          <img alt="logo" src="/icon-1500h.png" className="consulting-image" />
        </Link>
        <div data-thq="thq-navbar-nav" className="consulting-desktop-menu">
          <nav className="consulting-links">
            <Link to="/software-development" className="consulting-text">
              Software Development
            </Link>
            <Link to="/outsourcing" className="consulting-navlink01">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="consulting-navlink02">
              UI &amp; UX Design
            </Link>
            <Link to="/outsourcing" className="consulting-navlink03">
              Consulting
            </Link>
          </nav>
          {isNullOrEmpty(currentUser)
            ? <div className="home-buttons">
              <Link to="/" className="home-navlink03">
                <svg viewBox="0 0 1024 1024" className="home-icon">
                  <path d="M426 854h-212v-342h-128l426-384 426 384h-128v342h-212v-256h-172v256z"></path>
                </svg>
              </Link>
            </div>
            : <span className="home-navlink03">
              <div className="nav-profile">
                <Link title='Logout' to="/login" className="home-navlink03">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="#d19d54"
                    className="nav-icon"
                    scale={100}
                    onMouseEnter={() => onProfileMouseEnter(true)}
                    onMouseLeave={() => onProfileMouseEnter(false)}
                  >
                    {!profileMouseEntered
                      ? <path d="M870.286 765.143c-14.857-106.857-58.286-201.714-155.429-214.857-50.286 54.857-122.857 89.714-202.857 89.714s-152.571-34.857-202.857-89.714c-97.143 13.143-140.571 108-155.429 214.857 79.429 112 210.286 185.714 358.286 185.714s278.857-73.714 358.286-185.714zM731.429 365.714c0-121.143-98.286-219.429-219.429-219.429s-219.429 98.286-219.429 219.429 98.286 219.429 219.429 219.429 219.429-98.286 219.429-219.429zM1024 512c0 281.714-228.571 512-512 512-282.857 0-512-229.714-512-512 0-282.857 229.143-512 512-512s512 229.143 512 512z"></path>
                      : <path d="M877.714 512c0 241.714-197.143 438.857-438.857 438.857s-438.857-197.143-438.857-438.857c0-138.857 64-266.857 175.429-350.286 32.571-24.571 78.286-18.286 102.286 14.286 24.571 32 17.714 78.286-14.286 102.286-74.286 56-117.143 141.143-117.143 233.714 0 161.143 131.429 292.571 292.571 292.571s292.571-131.429 292.571-292.571c0-92.571-42.857-177.714-117.143-233.714-32-24-38.857-70.286-14.286-102.286 24-32.571 70.286-38.857 102.286-14.286 111.429 83.429 175.429 211.429 175.429 350.286zM512 73.143v365.714c0 40-33.143 73.143-73.143 73.143s-73.143-33.143-73.143-73.143v-365.714c0-40 33.143-73.143 73.143-73.143s73.143 33.143 73.143 73.143z"></path>
                    }
                  </svg>
                </Link>
                <Link title='Profile' to="/partner" className="home-navlink03">
                  <span className="nav-text01">{currentUser.firstName}</span>
                </Link>
              </div>
            </span>
          }
        </div>
        <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={() => setSideNavVisible(true)}>
          <svg viewBox="0 0 1024 1024" className="consulting-icon2">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className={isSideNavVisible ? 'home-mobile-menu-open' : isCloseBtnClicked ? 'home-mobile-menu-close' : 'home-mobile-menu'}>
          <div className="consulting-sidebar">
            <nav className="consulting-nav">
              <img
                alt="avatar"
                src="/icon-1500h.png"
                className="consulting-image1"
              />
              <Link to="/software-development" className="home-text01 home-text">
                Software Development
              </Link>
              <Link to="/outsourcing" className="home-text01 home-text">
                Outsourcing
              </Link>
              <Link to="/ui-ux-design" className="home-text01 home-text">
                UI &amp; UX Design
              </Link>
              <Link to="/consulting" className="home-text01 home-text">
                Consulting
              </Link>
              <Link to="/partnership" className="home-text01 home-text">
                Partnership
              </Link>
              <Link to="/login" className="home-text01 home-text">
                Logout
              </Link>
            </nav>
            <span className="home-text06" onClick={() => {
              setSideNavVisible(false)
              setCloseBtnClicked(true)
            }}>Close</span>
          </div>
        </div>
      </header>
      <div className="partner-hero section-container">
        <div className="partner-container01"></div>
        <div className="partner-container02">
          <div className="partner-container03">
            <div className="partner-container04">
              <div className="partner-container05">
                <div className="partner-container06">
                  <div className="partner-container07">
                    <div className="partner-container08">
                      <div className="partner-max-width max-content-container"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="partner-heading-container">
          <h1 className="partner-text07">Building Long Term Partnerships</h1>
          <span className="partner-text08">
            <span>Building the future</span>
            <br className="partner-text10"></br>
            <br></br>
          </span>
          <a
            href="https://wa.me/27849128213"
            className="partner-primary button-primary button-lg button"
          >
            Get in touch with us
          </a>
        </div>
      </div>
      {!isNullOrEmpty(currentUser.id) && (
        <div className="partner-blog" id="partner-blog" >
          <div className="partner-container09">
            <div className="partner-blog-post-card">
              <label htmlFor="file-input">
                {updateAvatar.inProgress
                  ? <div className="partner-image2">
                    <CircularProgress size={100} color="inherit" />
                  </div>
                  : <img
                    alt="avatar"
                    src={isNullOrEmpty(currentUser.avatarURL) ? require(avatarMouseEntered ? "../assets/update-avatar.png" : "../assets/user.png") : currentUser.avatarURL + "?" + new Date().getTime()}
                    className="partner-image2"
                    onMouseEnter={() => onAvatarMouseEnter(true)}
                    onMouseLeave={() => onAvatarMouseEnter(false)}
                  />
                }
              </label>
              <input
                id="file-input"
                type="file"
                alt="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e: any) => updateAvatar.execute(e.target.files![0])}
              />
              <div className="partner-container10">
                <div className="partner-container11">
                  <span className="partner-text12">Business Partner</span>
                  <span className="partner-text13">{currentUser.emailAddress}</span>
                </div>
                <h1 className="partner-text14">{`${currentUser.firstName} ${currentUser.lastName}`}</h1>
                <span className="partner-text15">
                  Hi I&apos;m a business partner for an IT organization I work with a team that
                  builds and maintain reliable applications that are affordable.
                  If you have an idea that speaks to the needs of the society get
                  in contact so we can bring your idea to life.
                </span>
                <div className="partner-container12">
                  <div className="partner-profile">
                    <img
                      alt="profile"
                      src="/icon-1500h.png"
                      className="partner-image3"
                    />
                    <span className="partner-text16">Target Online Pty Ltd</span>
                  </div>
                  <span className="partner-text17">www.targetonline.co.za</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isNullOrEmpty(currentUser.id) && (
        <div className="partner-stats">
          <div className="partner-stat">
            <svg viewBox="0 0 1152 1024" className="partner-icon04">
              <path d="M768 770.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              <path d="M327.196 795.328c55.31-36.15 124.080-63.636 199.788-80.414-15.054-17.784-28.708-37.622-40.492-59.020-30.414-55.234-46.492-116.058-46.492-175.894 0-86.042 0-167.31 30.6-233.762 29.706-64.504 83.128-104.496 159.222-119.488-16.914-76.48-61.94-126.75-181.822-126.75-192 0-192 128.942-192 288 0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h279.006c14.518-12.91 30.596-25.172 48.19-36.672z"></path>
            </svg>
            <span className="partner-text18">Customers</span>
            <span className="partner-text19">My Customers </span>
            <h1 className="partner-text20">{currentUser.customers}</h1>
          </div>
          <div className="partner-stat1">
            <svg viewBox="0 0 1024 1024" className="partner-icon07">
              <path d="M598 512h234l-234-234v234zM640 214l256 256v426q0 34-26 60t-60 26h-470q-34 0-59-26t-25-60v-598q0-34 26-59t60-25h298zM682 42v86h-512v598h-84v-598q0-34 25-60t59-26h512z"></path>
            </svg>
            <span className="partner-text21">Projects</span>
            <span className="partner-text22">Projects for my customers</span>
            <h1 className="partner-text23">{currentUser.projects}</h1>
          </div>
          <div className="partner-stat2">
            <svg viewBox="0 0 1024 1024" className="partner-icon09">
              <path d="M810 640v-86h-84v86h84zM810 810v-84h-84v84h84zM554 298v-84h-84v84h84zM554 470v-86h-84v86h84zM554 640v-86h-84v86h84zM554 810v-84h-84v84h84zM298 470v-86h-84v86h84zM298 640v-86h-84v86h84zM298 810v-84h-84v84h84zM640 470h256v426h-768v-598h256v-84l128-128 128 128v256z"></path>
            </svg>
            <span className="partner-text24">Monthly Income</span>
            <span className="partner-text25">
              What I&apos;m earning per  month
            </span>
            <h1 className="partner-text26">R{currentUser.income}</h1>
          </div>
        </div>
      )}
      <footer className="partner-footer">
        <div className="partner-container14">
          <Link to="/" className="partner-navlink4">
            <img alt="logo" src="/icon-1500h.png" className="partner-image4" />
          </Link>
          <nav className="partner-nav1">
            <Link to="/software-development" className="partner-navlink5">
              Software Development
            </Link>
            <Link to="/outsourcing" className="partner-navlink6">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="partner-navlink7">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="partner-navlink8">
              Consulting
            </Link>
          </nav>
        </div>
        <div className="partner-separator"></div>
        <div className="partner-container15">
          <span className="partner-text27">
            © 2017 Target Online Pty Ltd, All Rights Reserved.
          </span>
          <div className="partner-container16">
            <div className="partner-container17">
              <a
                href="https://wa.me/27849128213"
                target="_blank"
                rel="noreferrer noopener"
                className="partner-link"
              >
                <svg viewBox="0 0 1024 1024" className="partner-icon11">
                  <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Target-Online-Pty-Ltd/100064374471561"
                target="_blank"
                rel="noreferrer noopener"
                className="partner-link1"
              >
                <svg
                  viewBox="0 0 602.2582857142856 1024"
                  className="partner-icon13"
                >
                  <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Partner
