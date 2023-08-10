import React from 'react'

import PropTypes from 'prop-types'

import './feature-card2.css'

const FeatureCard2 = (props) => {
  return (
    <div className={`feature-card2-feature-card ${props.rootClassName} `}>
      <div className="feature-card2-container">
        <img
          alt={props.image_alt}
          src={props.image_src}
          className="feature-card2-image"
        />
      </div>
      <div className="feature-card2-container1">
        <h2 className="feature-card2-text">{props.title}</h2>
        <span className="">{props.description}</span>
      </div>
    </div>
  )
}

FeatureCard2.defaultProps = {
  rootClassName: '',
  image_src: '/website-200h.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.',
  title: 'Lorem ipsum',
  image_alt: 'image',
}

FeatureCard2.propTypes = {
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  image_alt: PropTypes.string,
}

export default FeatureCard2
