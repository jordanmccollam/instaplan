import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Icon } from '../index';

import './_hero.scss';

const logger = "Hero:: ";

const Hero = (props) => {
  let classes = {
		[`hero`]: true,
    [`hero-${props.kind}`]: true
	};

  return (
    <Card kind={props.kind} className={`${props.className} ${classnames(classes)} py-3 px-5`}>
      <div className="d-flex justify-content-between">
        <div style={{width: 'max-content'}}>
          <div className="hero-title" style={{fontSize: props.size}}>
            {props.links.map((link, i) => (
              <span key={`hero-link-${i}`} className="hero-link" onClick={link.action}>{link.label} / </span>
            ))}
            {props.title}
          </div>
          <div className="hero-subtitle">{props.subtitle}</div>
        </div>

        <div>
          {props.children}
        </div>
      </div>
    </Card>
  )
}

Hero.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'success', 'danger', 'default']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  size: PropTypes.number,
  links: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ])
}

Hero.defaultProps = {
  className: "",
  kind: 'default',
  title: "Default Hero Title",
  subtitle: "And this is the default subtitle",
  size: 38,
  links: []
}

export default Hero;


