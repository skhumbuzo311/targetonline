import React, { useState } from 'react'

import PropTypes from 'prop-types'

import './conditional-tabs.css'

const ConditionalTabs = (props) => {
  const [isVisible, setIsVisible] = useState(1)
  return (
    <div className={`conditional-tabs-container ${props.rootClassName} `}>
      <div className="conditional-tabs-container1">
        <button
          type="button"
          onClick={() => setIsVisible(1)}
          className="conditional-tabs-button button"
        >
          {props.button1}
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(2)}
          className="conditional-tabs-button1 button"
        >
          {props.button2}
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(3)}
          className="conditional-tabs-button2 button"
        >
          {props.button3}
        </button>
      </div>
      {isVisible === 1 && (
        <div className="conditional-tabs-banner">
          <h1 className="conditional-tabs-text">Title1</h1>
          <span className="conditional-tabs-text01">
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in
                dignissim tortor. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum
                mi ut rhoncus. Integer in dignissim tortor. Sed non volutpat
                turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim
                ortor.
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
          </span>
        </div>
      )}
      {isVisible === 2 && (
        <div className="conditional-tabs-banner1">
          <h1 className="conditional-tabs-text05">Title2</h1>
          <span className="conditional-tabs-text06">
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in
                dignissim tortor. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum
                mi ut rhoncus. Integer in dignissim tortor. Sed non volutpat
                turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim
                ortor.
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
          </span>
        </div>
      )}
      {isVisible === 3 && (
        <div className="conditional-tabs-banner2">
          <h1 className="conditional-tabs-text10">Title3</h1>
          <span className="conditional-tabs-text11">
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in
                dignissim tortor. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum
                mi ut rhoncus. Integer in dignissim tortor. Sed non volutpat
                turpis. Mauris luctus rutrum mi ut rhoncus. Integer in dignissim
                ortor.
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
          </span>
        </div>
      )}
    </div>
  )
}

ConditionalTabs.defaultProps = {
  button3: 'button',
  button1: 'button',
  button2: 'button',
  rootClassName: '',
}

ConditionalTabs.propTypes = {
  button3: PropTypes.string,
  button1: PropTypes.string,
  button2: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ConditionalTabs
