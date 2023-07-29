import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import FeatureCard2 from '../components/feature-card2'
import './outsourcing.css'

const Outsourcing = (props) => {
  const [isCloseBtnClicked, setCloseBtnClicked] = useState(false);
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  return (
    <div className="outsourcing-container">
      <Helmet>
        <title>Outsourcing - Target Online Pty Ltd</title>
        <meta
          property="og:title"
          content="Outsourcing - Target Online Pty Ltd"
        />
      </Helmet>
      <header data-thq="thq-navbar" className="outsourcing-navbar-interactive">
        <Link to="/" className="outsourcing-navlink">
          <img alt="logo" src="/icon-1500h.png" className="outsourcing-image" />
        </Link>
        <div data-thq="thq-navbar-nav" className="outsourcing-desktop-menu">
          <nav className="outsourcing-links">
            <Link to="/software-development" className="outsourcing-text">
              Software Development
            </Link>
            <Link to="/outsourcing" className="outsourcing-navlink01">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="outsourcing-navlink02">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="outsourcing-navlink03">
              Consulting
            </Link>
          </nav>
          <Link to="/" className="outsourcing-navlink04">
            <div className="outsourcing-buttons">
              <svg viewBox="0 0 1024 1024" className="outsourcing-icon">
                <path d="M426 854h-212v-342h-128l426-384 426 384h-128v342h-212v-256h-172v256z"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={()=> setSideNavVisible(true)}>
          <svg viewBox="0 0 1024 1024" className="outsourcing-icon2">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu"  className={isSideNavVisible ? 'home-mobile-menu-open' : isCloseBtnClicked ? 'home-mobile-menu-close' : 'home-mobile-menu'}>
          <div className="outsourcing-sidebar">
            <nav className="outsourcing-nav">
              <img
                alt="image"
                src="/icon-1500h.png"
                className="outsourcing-image1"
              />
              <Link to="/software-development" className="home-text01 home-text">
              Software Development
              </Link>
              <span className="home-text01 home-text" onClick={() => {
                setSideNavVisible(false)
                setCloseBtnClicked(true)
              }}>
              Outsourcing
              </span>
              <Link to="/ui-ux-design" className="home-text01 home-text">
              UI &amp; UX Design
              </Link>
              <Link to="/consulting" className="home-text01 home-text">
              Consulting
              </Link>
              <Link to="/" className="home-text01 home-text">
              Home
              </Link>
            </nav>
            <span className="home-text06" onClick={() => {
              setSideNavVisible(false)
              setCloseBtnClicked(true)
            }}>Close</span>
          </div>
        </div>
      </header>
      <div className="outsourcing-hero">
        <div className="outsourcing-container1">
          <div className="outsourcing-container2">
            <div className="outsourcing-container3">
              <h1 className="outsourcing-text07">
                Outsource Your Software Development
              </h1>
              <span className="outsourcing-text08">
                <span>
                  Looking for a reliable partner to outsource your software
                  development lifecycle? Look no further! Our expert team is
                  here to help you every step of the way, from planning and
                  design to development and maintenance.
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
        </div>
      </div>
      <div className="outsourcing-banner">
        <h1 className="outsourcing-text12">
          Why Outsource Your Software Development?
        </h1>
        <span className="outsourcing-text13">
          Outsourcing your software development needs can help you save money
          and improve your efficiency. By working with our experienced team,
          you&apos;ll be able to streamline your processes and focus on your
          core competencies.Our Services
        </span>
      </div>
      <div className="outsourcing-features">
        <div className="outsourcing-container4">
          <FeatureCard2
            title="Planning and Design"
            image_src="/register-icon.svg"
            description="Our team of expert planners and designers can help you create a comprehensive roadmap for your software development project. We'll work closely with you to understand your business goals and create a plan that aligns with your vision."
            rootClassName="rootClassName4"
          ></FeatureCard2>
          <FeatureCard2
            title=" Dedicated Development Team"
            image_src="/development-and-testing-2.svg"
            description="Once the planning and design phase is complete, our development team will take over. We use the latest technologies and best practices to ensure that your software is developed quickly, efficiently, and to the highest standards."
            rootClassName="rootClassName5"
          ></FeatureCard2>
          <FeatureCard2
            title="Quality Assurance and Testing"
            image_src="/development-and-testing-1.svg"
            description="Testing is a critical part of the software development process, and our team is dedicated to ensuring that your software is thoroughly tested before it's released. We use a variety of testing methodologies to identify and fix any issues before they become a problem."
            rootClassName="rootClassName6"
          ></FeatureCard2>
          <FeatureCard2
            title="Maintenance and Support"
            image_src="/deployment-and-maintenance.svg"
            description="After your software is released, we'll be there to provide ongoing maintenance and support. Whether you need help fixing a bug or adding new features, our team is always here to help you get the most out of your software."
            rootClassName="rootClassName7"
          ></FeatureCard2>
        </div>
      </div>
      <footer className="outsourcing-footer">
        <div className="outsourcing-container5">
          <Link to="/" className="outsourcing-navlink05">
            <img
              alt="logo"
              src="/icon-1500h.png"
              className="outsourcing-image2"
            />
          </Link>
          <nav className="outsourcing-nav1">
            <Link to="/software-development" className="outsourcing-navlink06">
                  Software Development
            </Link>
            <Link to="/outsourcing" className="outsourcing-navlink07">
              Outsourcing
            </Link>
            <Link to="/ui-ux-design" className="outsourcing-navlink08">
              UI &amp; UX Design
            </Link>
            <Link to="/consulting" className="outsourcing-navlink09">
              Consulting
            </Link>
          </nav>
        </div>
        <div className="outsourcing-separator"></div>
        <div className="outsourcing-container6">
          <span className="outsourcing-text14">
            © 2017 Target Online Pty Ltd, All Rights Reserved.
          </span>
          <div className="outsourcing-container7">
            <div className="outsourcing-container8">
              <svg viewBox="0 0 1024 1024" className="outsourcing-icon4">
                <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="outsourcing-icon6"
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

export default Outsourcing
