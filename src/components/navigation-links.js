import React from 'react'

import PropTypes from 'prop-types'

import './navigation-links.css'

const NavigationLinks = (props) => {
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <span className="navigation-links-text Navigation-Link">
        {props.link1}
      </span>
      <span className="navigation-links-text1 Navigation-Link">
        {props.link2}
      </span>
      <span className="navigation-links-text2 Navigation-Link">
        {props.link3}
      </span>
      <span className="navigation-links-text3 Navigation-Link">
        {props.link4}
      </span>
    </nav>
  )
}

NavigationLinks.defaultProps = {
  link3: 'Portofolio',
  rootClassName: '',
  link2: 'About',
  link4: 'Blog',
  link1: 'Home',
}

NavigationLinks.propTypes = {
  link3: PropTypes.string,
  rootClassName: PropTypes.string,
  link2: PropTypes.string,
  link4: PropTypes.string,
  link1: PropTypes.string,
}

export default NavigationLinks
