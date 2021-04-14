import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_button.scss';

const logger = "Button:: ";

const Button = (props) => {
  let classes = {
		[`button`]: true,
    [`button-${props.kind}`]: true,
    [`button-${props.size}`]: true
	};

  return (
    <div onClick={props.onClick} className={`${props.className} ${classnames(classes)}`}>
    
      {props.children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  kind: PropTypes.oneOf(['default']),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

Button.defaultProps = {
  className: "",
  kind: 'default',
  children: "+",
  onClick: () => console.log(logger + 'onClick'),
  size: 'sm'
}

export default Button;


