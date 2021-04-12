import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_logo.scss';

const logger = "Logo:: ";

const Logo = (props) => {
  let classes = {
		[`logo`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`} style={{fontSize: props.size, color: props.color}}>
      INSTA{props.break && <br/>}PLAN
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  break: PropTypes.bool
}

Logo.defaultProps = {
  className: "",
  break: false
}

export default Logo;


