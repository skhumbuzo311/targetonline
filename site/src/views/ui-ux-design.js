import './ui-ux-design.css'

import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import FeatureCard2 from '../components/feature-card2'
import { CurrentUserContext } from 'store'
import { isNullOrEmpty } from 'shared/utils/string';

const UIUXDesign = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const [isCloseBtnClicked, setCloseBtnClicked] = useState(false);
  const [profileMouseEntered, onProfileMouseEnter] = useState(false);

  useEffect(() => document.getElementById('uiu-design-container').scrollIntoView(), [])

  return (
    <div className="uiu-design-container" id="uiu-design-container">
      <Helmet>
        <title>UI-UX-Design - Target Online Pty Ltd</title>
        <meta
          property="og:title"
          content="UI-UX-Design - Target Online Pty Ltd"
        />
      </Helmet>
      <header data-thq="thq-navbar" className="uiu-design-navbar-interactive">
        <Link to="/" className="uiu-design-navlink">
          <img alt="logo" src="/icon-1500h.png" className="uiu-design-image" />
        </Link>
        <div data-thq="thq-navbar-nav" className="uiu-design-desktop-menu">
          <nav className="uiu-design-links">
            <Link to="/software-development" className="uiu-design-text">
              Software Development
            </Link>
            <Link to="/outsourcing" className="uiu-design-navlink01">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="uiu-design-navlink02">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="uiu-design-navlink03">
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
          <svg viewBox="0 0 1024 1024" className="uiu-design-icon2">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className={isSideNavVisible ? 'home-mobile-menu-open' : isCloseBtnClicked ? 'home-mobile-menu-close' : 'home-mobile-menu'}>
          <div className="uiu-design-sidebar">
            <nav className="uiu-design-nav">
              <img
                alt="avatar"
                src="/icon-1500h.png"
                className="uiu-design-image1"
              />
              <Link to="/software-development" className="home-text01 home-text">
                Software Development
              </Link>
              <Link to="/ui-ux-design" className="home-text01 home-text">
                Outsourcing
              </Link>
              <span className="home-text01 home-text" onClick={() => {
                setSideNavVisible(false)
                setCloseBtnClicked(true)
              }}>
                UI &amp; UX Design
              </span>
              <Link to="/consulting" className="home-text01 home-text">
                Consulting
              </Link>
              <Link to="/partnership" className="home-text01 home-text">
                Partnership
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
      <div className="uiu-design-banner">
        <div className="uiu-design-container1">
          <h1 className="uiu-design-text07">
            User Interface &amp; Experience Design
          </h1>
          <span className="uiu-design-text08">
            <span>
              Our passionate team of designers is dedicated to creating
              user-friendly and visually engaging interfaces that will let users
              fall in love with your product. Together we create an experience
              that truly stands out.
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
        </div>
      </div>
      <div className="uiu-design-banner1">
        <h1 className="uiu-design-text12">
          <span>UX/UI Design Services</span>
          <br></br>
          <span>Creating user centric designs </span>
        </h1>
        <span className="uiu-design-text16">
          Our UX/UI design services focus on creating intuitive and engaging
          user experiences that drive customer engagement and business growth.
        </span>
      </div>
      <div className="uiu-design-features">
        <div className="uiu-design-container2">
          <FeatureCard2
            title="User Research and Analysis"
            image_src="/user-research-and-analysis.svg"
            description="Our team conducts extensive user research to gain insights into user needs, behaviors, and pain points, and uses this information to design effective solutions."
            rootClassName="rootClassName8"
          ></FeatureCard2>
          <FeatureCard2
            title="User Experience (UX) Design"
            image_src="/user-experience-ux-design.svg"
            description="We specialise in creating user-centred designs that prioritise ease of use, efficiency, and customer satisfaction, helping businesses build long-term customer loyalty."
            rootClassName="rootClassName9"
          ></FeatureCard2>
          <FeatureCard2
            title="User Interface (UI) Design"
            image_src="/user-interface-ui-design.svg"
            description="Our UI design services focus on creating visually appealing and consistent interfaces that enhance usability, improve engagement, and elevate brand identity."
            rootClassName="rootClassName10"
          ></FeatureCard2>
          <FeatureCard2
            title="Prototyping and Testing"
            image_src="/prototyping-and-testing.svg"
            description="We use rapid prototyping and testing methodologies to quickly iterate designs and gather feedback, ensuring that the final solution meets user and business needs."
            rootClassName="rootClassName11"
          ></FeatureCard2>
        </div>
      </div>
      <footer className="uiu-design-footer">
        <div className="uiu-design-container3">
          <Link to="/" className="uiu-design-navlink05">
            <img
              alt="logo"
              src="/icon-1500h.png"
              className="uiu-design-image2"
            />
          </Link>
          <nav className="uiu-design-nav1">
            <Link to="/software-development" className="uiu-design-navlink06">
              Software Development
            </Link>
            <Link to="/outsourcing" className="uiu-design-navlink07">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="uiu-design-navlink08">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="uiu-design-navlink09">
              Consulting
            </Link>
          </nav>
        </div>
        <div className="uiu-design-separator"></div>
        <div className="uiu-design-container4">
          <span className="uiu-design-text17">
            © 2017 Target Online Pty Ltd, All Rights Reserved.
          </span>
          <div className="uiu-design-container5">
            <div className="uiu-design-container6">
              <svg viewBox="0 0 1024 1024" className="uiu-design-icon4">
                <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="uiu-design-icon6"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UIUXDesign
