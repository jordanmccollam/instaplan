import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import * as Icons from './Icons';

import './_icon.scss';

const logger = "Icon:: ";

const Icon = (props) => {
  const DynamicIcon = Icons[props.name];
  let classes = {
		[`icon`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`} style={{color: props.color}} >
      <DynamicIcon 
        size={props.size}
      />
    </div>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  name: PropTypes.string
}

Icon.defaultProps = {
  className: "",
  color: 'inherit',
  name: 'GoHome'
}

export default Icon;


