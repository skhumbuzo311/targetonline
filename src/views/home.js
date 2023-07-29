import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import ServicesCard from '../components/services-card'
import PortofolioCard from '../components/portofolio-card'
import './home.css'

const Home = (props) => {
  const [isCloseBtnClicked, setCloseBtnClicked] = useState(false);
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  return (
    <div className="home-container">
      <Helmet>
        <title>Target Online Pty Ltd</title>
        <meta property="og:title" content="Target Online Pty Ltd" />
      </Helmet>
      <main className="home-main">
        <header data-thq="thq-navbar" className="home-navbar-interactive">
          <img alt="logo" src="/icon-1500h.png" className="home-image" />
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
              <Link to="/software-development" className="home-text">
                Software Development
              </Link>
              <Link to="/outsourcing" className="home-navlink">
                Outsourcing
              </Link>
              <Link to="/ui-ux-design" className="home-navlink01">
                UI &amp; UX Design
              </Link>
              <Link to="/consulting" className="home-navlink02">
                Consulting
              </Link>
            </nav>
            <div className="home-buttons">
              <Link to="/" className="home-navlink03">
                <svg viewBox="0 0 1024 1024" className="home-icon">
                  <path d="M426 854h-212v-342h-128l426-384 426 384h-128v342h-212v-256h-172v256z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={()=> setSideNavVisible(true)}>
            <svg viewBox="0 0 1024 1024" className="home-icon02">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu"  className={isSideNavVisible ? 'home-mobile-menu-open' : isCloseBtnClicked ? 'home-mobile-menu-close' : 'home-mobile-menu'}>
            <div className="home-sidebar">
              <nav className="home-nav">
                <img
                  alt="image"
                  src="/icon-1500h.png"
                  className="home-image1"
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
                <span onClick={() => {
                  setSideNavVisible(false)
                  setCloseBtnClicked(true)
                }}>Home</span>
              </nav>
              <span className="home-text06" onClick={() => {
                setSideNavVisible(false)
                setCloseBtnClicked(true)
              }}>Close</span>
            </div>
          </div>
        </header>
        <div className="home-hero section-container">
          <div className="home-container01"></div>
          <div className="home-container02">
            <div className="home-container03">
              <div className="home-container04">
                <div className="home-container05">
                  <div className="home-container06">
                    <div className="home-container07">
                      <div className="home-container08">
                        <div className="home-max-width max-content-container"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-heading-container">
            <h1 className="home-text07">Digital Solutions People Love</h1>
            <span className="home-text08">
              <span>Building the future</span>
              <br className="home-text10"></br>
              <br></br>
            </span>
            <a
              href="mailto:info@targetonline.co.za?subject=Potential Customer"
              className="home-primary button-primary button-lg button"
            >
              Get in touch with us
            </a>
          </div>
        </div>
        <div className="home-services section-container">
          <div className="home-max-width1 max-content-container">
            <div className="home-heading-container1">
              <div className="home-text-container">
                <span className="home-text12">our services</span>
                <h2 className="home-text13 Heading2">
                  <span>
                    We provide a wide range of
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <br></br>
                  <span>creative solutions</span>
                </h2>
              </div>
            </div>
            <div className="home-cards-container display-flex">
              <Link to="/software-development" className="home-navlink04">
                <ServicesCard
                  text1="Let us handle the software development. Our team of specialists offer complete services such as front-end and back-end creation, database combination and hosting. We bring effective and trustworthy solutions tailored to your business requirements."
                  image_src="/skill-branding.svg"
                  rootClassName="services-card-root-class-name"
                  className="home-component"
                ></ServicesCard>
              </Link>
              <Link to="/outsourcing" className="home-navlink05">
                <ServicesCard
                  text="Outsourcing"
                  text1="Looking for comprehensive software development outsourcing? Our team offers expertise throughout the entire lifecycle, from planning to maintenance. Get all the resources you need to reach your project goals in one place."
                  image_src="/strategy.svg"
                  rootClassName="services-card-root-class-name1"
                  className="home-component1"
                ></ServicesCard>
              </Link>
            </div>
            <div className="home-cards-container1">
              <Link to="/ui-ux-design" className="home-navlink06">
                <ServicesCard
                  text="UI &amp; UX Design"
                  text1="Control the way your current or future customers see your product. Our passionate team of designers is dedicated to creating user-friendly and visually engaging interfaces that will let users fall in love with your product. Together we create an experience that truly stands out."
                  image_src="/skills-icon.svg"
                  rootClassName="services-card-root-class-name2"
                  className="home-component2"
                ></ServicesCard>
              </Link>
              <Link to="/consulting" className="home-navlink07">
                <ServicesCard
                  text="Consulting"
                  text1="With our comprehensive consulting services, we provide expert guidance and support throughout the entire software development lifecycle. From strategy to implementation, we help you build better software solutions."
                  image_src="/research.svg"
                  rootClassName="services-card-root-class-name3"
                  className="home-component3"
                ></ServicesCard>
              </Link>
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="home-max-width2 max-content-container">
            <div className="home-text-container1">
              <span className="home-text17">our work</span>
              <h2 className="home-text18 Heading2">
                <span>Explore our portfolio</span>
              </h2>
              <span className="home-text20">Project templates</span>
            </div>
            <div className="home-tab-selector-cards-container">
              <a
                href="https://car-rental-template.web.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link"
              >
                <PortofolioCard
                  image_src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxjYXJzfGVufDB8fHx8MTY4OTUzMTMyM3ww&amp;ixlib=rb-4.0.3&amp;h=400"
                  project_title="Cart Rental - Design Concept"
                  rootClassName="portofolio-card-root-class-name"
                  className="home-component4"
                ></PortofolioCard>
              </a>
              <a
                href="https://gymate-template.web.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link1"
              >
                <PortofolioCard
                  image_src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIyfHxneW18ZW58MHx8fHwxNjg5NTMyMDMxfDA&amp;ixlib=rb-4.0.3&amp;h=400"
                  project_title="Gym Mate - Design Concept"
                  rootClassName="portofolio-card-root-class-name4"
                  className="home-component5"
                ></PortofolioCard>
              </a>
            </div>
            <div className="home-tab-selector-cards-container1">
              <a
                href="https://coindom-crypto-main.web.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link2"
              >
                <PortofolioCard
                  image_src="https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDV8fGNyeXB0b3xlbnwwfHx8fDE2ODk1MzIxMjR8MA&amp;ixlib=rb-4.0.3&amp;h=400"
                  project_title="Crypto Currency - Design Concept"
                  rootClassName="portofolio-card-root-class-name1"
                  className="home-component6"
                ></PortofolioCard>
              </a>
              <a
                href="https://ecommerce-template-site.web.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link3"
              >
                <PortofolioCard
                  image_src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE1fHxlY29tbWVyY2V8ZW58MHx8fHwxNjg5NTMyMjA4fDA&amp;ixlib=rb-4.0.3&amp;h=400"
                  project_title="ECommerce - Design Concept"
                  rootClassName="portofolio-card-root-class-name2"
                  className="home-component7"
                ></PortofolioCard>
              </a>
            </div>
          </div>
        </div>
        <div className="home-about section-container">
          <div className="home-max-width3 max-content-container">
            <div className="home-text-container2">
              <span className="home-text21">about us</span>
              <h2 className="home-text22 Heading2">
                <span>
                  We build brands with
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>purpose and impact</span>
              </h2>
              <span className="home-text26">
                We are a full-service digital creative agency with  plenty of
                in-house talent.
              </span>
              <div className="home-checklist">
                <div className="home-check-item">
                  <svg viewBox="0 0 1024 1024" className="home-icon04">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text27">
                    Quality services and support all time
                  </span>
                </div>
                <div className="home-check-item1">
                  <svg viewBox="0 0 1024 1024" className="home-icon06">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text28">
                    Long-term strategy development
                  </span>
                </div>
                <div className="home-check-item2">
                  <svg viewBox="0 0 1024 1024" className="home-icon08">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text29">24/7 IT Support</span>
                </div>
                <div className="home-check-item3">
                  <svg viewBox="0 0 1024 1024" className="home-icon10">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text30">Long term relationships</span>
                </div>
                <div className="home-check-item4">
                  <svg viewBox="0 0 1024 1024" className="home-icon12">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text31">
                    Surety that you focus on your business
                  </span>
                </div>
                <div className="home-check-item5">
                  <svg viewBox="0 0 1024 1024" className="home-icon14">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="home-text32">
                    Support in any implementation
                  </span>
                </div>
              </div>
            </div>
            <div className="home-image-container">
              <img
                alt="image"
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGJsYWNrJTIwYnVzaW5lc3N8ZW58MHx8fHwxNjg5NTM0Njc0fDA&amp;ixlib=rb-4.0.3&amp;w=500"
                className="home-image2"
              />
            </div>
          </div>
        </div>
        <div className="home-process section-container">
          <div className="home-steps">
            <h1 className="home-text33">
              <span>Discover Our Process</span>
            </h1>
            <span className="home-text35">
              <span className="home-text36">
                Four step process to get your idea from paper to a working
                solution
              </span>
              <br></br>
            </span>
            <div className="home-container09">
              <div className="home-step">
                <div className="home-container10">
                  <div className="home-line"></div>
                  <div className="home-container11">
                    <svg viewBox="0 0 1024 1024" className="home-icon16">
                      <path d="M634 558q92-64 92-174 0-88-63-151t-151-63-151 63-63 151q0 46 27 96t65 78l36 26v98h172v-98zM512 86q124 0 211 87t87 211q0 156-128 244v98q0 18-12 30t-30 12h-256q-18 0-30-12t-12-30v-98q-128-88-128-244 0-124 87-211t211-87zM384 896v-42h256v42q0 18-12 30t-30 12h-172q-18 0-30-12t-12-30z"></path>
                    </svg>
                  </div>
                  <div className="home-line1"></div>
                </div>
                <div className="home-container12">
                  <h1 className="home-text38">
                    <span>Ideate</span>
                  </h1>
                  <span className="home-text40">
                    <span>
                      First step in the process, generating innovative ideas and
                      defining project goals
                    </span>
                    <br></br>
                  </span>
                </div>
              </div>
              <div className="home-step1">
                <div className="home-container13">
                  <div className="home-line2"></div>
                  <div className="home-container14">
                    <svg viewBox="0 0 1024 1024" className="home-icon18">
                      <path d="M746 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM618 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM406 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM278 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM512 128q158 0 271 100t113 242q0 88-63 150t-151 62h-74q-28 0-46 19t-18 45q0 22 16 42t16 44q0 28-18 46t-46 18q-160 0-272-112t-112-272 112-272 272-112z"></path>
                    </svg>
                  </div>
                  <div className="home-line3"></div>
                </div>
                <div className="home-container15">
                  <h1 className="home-text43">Design</h1>
                  <span className="home-text44">
                    <span>
                      {' '}
                      The system and software designs are prepared in this phase
                      based on the requirements
                    </span>
                    <br></br>
                  </span>
                </div>
              </div>
              <div className="home-step2">
                <div className="home-container16">
                  <div className="home-line4"></div>
                  <div className="home-container17">
                    <svg viewBox="0 0 1024 1024" className="home-icon20">
                      <path d="M576 736l96 96 320-320-320-320-96 96 224 224z"></path>
                      <path d="M448 288l-96-96-320 320 320 320 96-96-224-224z"></path>
                    </svg>
                  </div>
                  <div className="home-line5"></div>
                </div>
                <div className="home-container18">
                  <h1 className="home-text47">
                    <span>Develop</span>
                  </h1>
                  <span className="home-text49">
                    <span className="home-text50">
                      Writing, coding, and implementing the software solution
                      based on the design specifications
                    </span>
                    <br className="home-text51"></br>
                    <br></br>
                  </span>
                </div>
              </div>
              <div className="home-step3">
                <div className="home-container19">
                  <div className="home-line6"></div>
                  <div className="home-container20">
                    <svg viewBox="0 0 1024 1024" className="home-icon23">
                      <path d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM751.59 704c8.58-40.454 13.996-83.392 15.758-128h127.446c-3.336 44.196-13.624 87.114-30.68 128h-112.524zM208.41 384c-8.58 40.454-13.996 83.392-15.758 128h-127.444c3.336-44.194 13.622-87.114 30.678-128h112.524zM686.036 384c9.614 40.962 15.398 83.854 17.28 128h-191.316v-128h174.036zM512 320v-187.338c14.59 4.246 29.044 11.37 43.228 21.37 26.582 18.74 52.012 47.608 73.54 83.486 14.882 24.802 27.752 52.416 38.496 82.484h-155.264zM331.232 237.516c21.528-35.878 46.956-64.748 73.54-83.486 14.182-10 28.638-17.124 43.228-21.37v187.34h-155.264c10.746-30.066 23.616-57.68 38.496-82.484zM448 384v128h-191.314c1.88-44.146 7.666-87.038 17.278-128h174.036zM95.888 704c-17.056-40.886-27.342-83.804-30.678-128h127.444c1.762 44.608 7.178 87.546 15.758 128h-112.524zM256.686 576h191.314v128h-174.036c-9.612-40.96-15.398-83.854-17.278-128zM448 768v187.34c-14.588-4.246-29.044-11.372-43.228-21.37-26.584-18.74-52.014-47.61-73.54-83.486-14.882-24.804-27.75-52.418-38.498-82.484h155.266zM628.768 850.484c-21.528 35.876-46.958 64.746-73.54 83.486-14.184 9.998-28.638 17.124-43.228 21.37v-187.34h155.266c-10.746 30.066-23.616 57.68-38.498 82.484zM512 704v-128h191.314c-1.88 44.146-7.666 87.040-17.28 128h-174.034zM767.348 512c-1.762-44.608-7.178-87.546-15.758-128h112.524c17.056 40.886 27.344 83.806 30.68 128h-127.446zM830.658 320h-95.9c-18.638-58.762-44.376-110.294-75.316-151.428 42.536 20.34 81.058 47.616 114.714 81.272 21.48 21.478 40.362 44.938 56.502 70.156zM185.844 249.844c33.658-33.658 72.18-60.932 114.714-81.272-30.942 41.134-56.676 92.666-75.316 151.428h-95.898c16.138-25.218 35.022-48.678 56.5-70.156zM129.344 768h95.898c18.64 58.762 44.376 110.294 75.318 151.43-42.536-20.34-81.058-47.616-114.714-81.274-21.48-21.478-40.364-44.938-56.502-70.156zM774.156 838.156c-33.656 33.658-72.18 60.934-114.714 81.274 30.942-41.134 56.678-92.668 75.316-151.43h95.9c-16.14 25.218-35.022 48.678-56.502 70.156z"></path>
                    </svg>
                  </div>
                  <div className="home-line7"></div>
                </div>
                <div className="home-container21">
                  <h1 className="home-text53">Deploy</h1>
                  <span className="home-text54">
                    <span>
                      The product is delivered / deployed to the customer for
                      use after performance testing
                    </span>
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-banner section-container">
          <div className="home-max-width4 max-content-container">
            <span className="home-text57">START EARNING WITH US</span>
            <h2 className="home-text58 Heading2">Become a partner</h2>
            <span className="home-text59">
              Become a partner by finding clients and start earning today.
            </span>
            <a
              href="mailto:info@targetonline.co.za?subject=Partnership Registration"
              className="home-primary1 button-lg button-secondary-white button"
            >
              Contact Us
            </a>
          </div>
        </div>
        <footer className="home-footer">
          <div className="home-container22">
            <Link to="/" className="home-navlink08">
              <img alt="logo" src="/icon-1500h.png" className="home-image3" />
            </Link>
            <nav className="home-nav1">
              <Link to="/software-development" className="home-navlink09">
                    Software Development
              </Link>
              <Link to="/outsourcing" className="home-navlink10">
                Outsourcing
              </Link>
              <Link to="/ui-ux-design" className="home-navlink11">
                UI &amp; UX Design
              </Link>
              <Link to="/consulting" className="home-navlink12">
                Consulting
              </Link>
            </nav>
          </div>
          <div className="home-separator"></div>
          <div className="home-container23">
            <span className="home-text60">
              © 2017 Target Online Pty Ltd, All Rights Reserved.
            </span>
            <div className="home-container24">
              <div className="home-container25">
                <a
                  href="https://wa.me/27849128213"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="home-link4"
                >
                  <svg viewBox="0 0 1024 1024" className="home-icon25">
                    <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/Target-Online-Pty-Ltd/100064374471561"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="home-link5"
                >
                  <svg
                    viewBox="0 0 602.2582857142856 1024"
                    className="home-icon27"
                  >
                    <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Home
