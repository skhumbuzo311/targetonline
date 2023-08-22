import './partnership.css'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import FeatureCard22 from '../components/feature-card22'
import { CurrentUserContext } from 'store'
import { isNullOrEmpty } from 'shared/utils/string';

const Partnership = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const [isCloseBtnClicked, setCloseBtnClicked] = useState(false);
  const [profileMouseEntered, onProfileMouseEnter] = useState(false);
  return (
    <div className="partnership-container">
      <Helmet>
        <title>Partnership - Target Online Pty Ltd</title>
        <meta
          property="og:title"
          content="Partnership - Target Online Pty Ltd"
        />
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
          {isNullOrEmpty(currentUser.current)
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
                  <span className="nav-text01">{currentUser.current.firstName}</span>
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
              <Link to="/" className="home-text01 home-text">
                Home
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
      <div className="partnership-hero section-container">
        <div className="partnership-container01"></div>
        <div className="partnership-container02">
          <div className="partnership-container03">
            <div className="partnership-container04">
              <div className="partnership-container05">
                <div className="partnership-container06">
                  <div className="partnership-container07">
                    <div className="partnership-container08">
                      <div className="partnership-max-width max-content-container"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="partnership-heading-container">
          <h1 className="partnership-text07">
            Building Long Term Partnerships
          </h1>
          <span className="partnership-text08">
            <span>Building the future</span>
            <br className="partnership-text10"></br>
            <br></br>
          </span>
          <a
            href="mailto:info@targetonline.co.za?subject=Potential Customer"
            className="partnership-primary button-primary button-lg button"
          >
            Get in touch with us
          </a>
        </div>
      </div>
      <div className="partnership-banner">
        <h1 className="partnership-text12">Partnership</h1>
        <span className="partnership-text13">
          Becoming a partner means you become part of the brand. the initial
          requirement is to  understand what we do then find a client that
          requires our services that could be someone needing an application to
          be developed to bring their idea to life.  Once you have found a
          potential client we develop a contract that matches the clients
          requirements. Once the client has signed the contract as the partner
          you are entitled to 50% of the profit.
        </span>
        <Link to="/partner" className="partnership-button button" >
          Register
        </Link>
        <div className="partnership-features">
          <h1 className="partnership-text14">Passive Sustainable Income</h1>
          <div className="partnership-container09">
            <FeatureCard22
              title="Contract Initiation"
              description="During the contract initiation stage, the client is required to settle the contract initiation fee which is calculated based on the application requirements stipulated by the client 50% of this amount is allocated to the partner"
              rootClassName="rootClassName"
            ></FeatureCard22>
            <FeatureCard22
              title="Monthly Service Fee"
              description="Since our target market is mostly start up businesses we understand that on average out clients do not have funds to settle all project costs up front which is why we have adopted strategy where client rather pays affordable monthly service fees making our services affordable for our target market, as a partner you are entitled to 50% on this amount which is paid on a monthly basis by the client"
              rootClassName="rootClassName3"
            ></FeatureCard22>
            <FeatureCard22
              title="Additional Application Features"
              description="Additional features that were originally not part of the original design have a costs which is calculated based on the feature's complexity and factored into the original contract which impact the monthly service fee. If a new feature required by the client is calculated to be 10% more on the monthly service fee this means as a partner you will now earn 5% more monthly from monthly service fee."
              rootClassName="rootClassName2"
            ></FeatureCard22>
            <FeatureCard22
              title="Contract Renewals"
              rootClassName="rootClassName1"
              description="Contract renewals work similar to the contract initiation in the sense that they are also the starting point of a new contract. Our contract work on annual basis and are renewed annually. Upon contract renewal there is a renewal fee which is settled by the client , as a partner you are entitled to 50% of this amount."
            ></FeatureCard22>
          </div>
        </div>
      </div>
      <div className="partnership-steps">
        <h1 className="partnership-text15">
          <span>Steps To Become A Partner</span>
          <br></br>
          <br></br>
        </h1>
        <div className="partnership-container10">
          <div className="partnership-container11">
            <div className="partnership-step">
              <h1 className="partnership-text19">
                <span>1</span>
              </h1>
              <h1 className="partnership-text21">Understand The Business</h1>
              <span className="partnership-text22">
                <span>
                  Need to understand the business to find clients that are most
                  suitable
                </span>
                <br></br>
              </span>
            </div>
            <div className="partnership-step1">
              <h1 className="partnership-text25">
                <span>2</span>
              </h1>
              <h1 className="partnership-text27">
                <span>Find </span>
                <br></br>
                <span>Clients</span>
              </h1>
              <span className="partnership-text31">
                <span>
                  Remember you are not a partner until you have a client under
                  your name
                </span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="partnership-container12">
            <div className="partnership-step2">
              <h1 className="partnership-text34">
                <span>3</span>
              </h1>
              <h1 className="partnership-text36">Contract Signing</h1>
              <span className="partnership-text37">
                <span>
                  This step makes you an official partner, when contract
                  initiation fee is settled you start earning
                </span>
                <br></br>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="partnership-footer">
        <div className="partnership-container13">
          <Link to="/" className="partnership-navlink4">
            <img
              alt="logo"
              src="/icon-1500h.png"
              className="partnership-image2"
            />
          </Link>
          <nav className="partnership-nav1">
            <Link to="/software-development" className="partnership-navlink5">
              Software Development
            </Link>
            <Link to="/outsourcing" className="partnership-navlink6">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="partnership-navlink7">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="partnership-navlink8">
              Consulting
            </Link>
          </nav>
        </div>
        <div className="partnership-separator"></div>
        <div className="partnership-container14">
          <span className="partnership-text40">
            © 2017 Target Online Pty Ltd, All Rights Reserved.
          </span>
          <div className="partnership-container15">
            <div className="partnership-container16">
              <a
                href="https://wa.me/27849128213"
                target="_blank"
                rel="noreferrer noopener"
                className="partnership-link"
              >
                <svg viewBox="0 0 1024 1024" className="partnership-icon4">
                  <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Target-Online-Pty-Ltd/100064374471561"
                target="_blank"
                rel="noreferrer noopener"
                className="partnership-link1"
              >
                <svg
                  viewBox="0 0 602.2582857142856 1024"
                  className="partnership-icon6"
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

export default Partnership
