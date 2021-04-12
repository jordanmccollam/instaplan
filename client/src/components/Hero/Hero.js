import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card } from '../index';

import './_hero.scss';

const logger = "Hero:: ";

const Hero = (props) => {
  let classes = {
		[`hero`]: true,
    [`hero-${props.kind}`]: true
	};

  return (
    <Card kind={props.kind} className={`${props.className} ${classnames(classes)} p-4`}>
      <div className="hero-title" style={{fontSize: props.size}}>{props.title}</div>
      <div className="hero-subtitle" style={{fontSize: props.size / 3}}>{props.subtitle}</div>
    </Card>
  )
}

Hero.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'success', 'danger']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  size: PropTypes.number
}

Hero.defaultProps = {
  className: "",
  kind: 'primary',
  title: "Default Hero Title",
  subtitle: "And this is the default subtitle",
  size: 50
}

export default Hero;


