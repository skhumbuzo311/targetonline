import React from 'react'

import PropTypes from 'prop-types'

import './services-card.css'

const ServicesCard = (props) => {
  return (
    <div
      className={`services-card-services-card services-card ${props.rootClassName} `}
    >
      <div className="services-card-container">
        <img
          alt={props.image_alt}
          src={props.image_src}
          className="services-card-image"
        />
      </div>
      <span className="services-card-text">{props.text}</span>
      <span className="services-card-text1">{props.text1}</span>
      <span className="services-card-text2">{props.text2}</span>
    </div>
  )
}

ServicesCard.defaultProps = {
  image_alt: 'image',
  image_src: '/website-200h.png',
  rootClassName: '',
  text: 'Software Development',
  text1:
    'Looking for comprehensive software development outsourcing? Our team offers expertise throughout the entire lifecycle, from planning to maintenance. Get all the resources you need to reach your project goals in one place.',
  text2: 'Learn more',
}

ServicesCard.propTypes = {
  image_alt: PropTypes.string,
  image_src: PropTypes.string,
  rootClassName: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
}

export default ServicesCard
