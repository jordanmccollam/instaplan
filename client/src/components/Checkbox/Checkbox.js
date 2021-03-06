import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Icon } from '../index';

import './_checkbox.scss';

const logger = "Checkbox:: ";

const Checkbox = (props) => {
  let classes = {
		[`checkbox`]: true,
		[`checkbox-checked`]: props.checked,
	};

  const defaultCheck = () => {
    if (props.setChecked) {
      props.setChecked(prev => !prev);
    } else {
      console.log(logger + 'defaultCheck: No setChecked passed as props');
    }
  }

  return (
    <div onClick={props.onCheck ? props.onCheck : defaultCheck} className={`${props.className} ${classnames(classes)}`}>
      {props.checked ? <Icon name="BsCheck" /> : <Icon name="TiTimes" />}
    </div>
  )
}

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  setChecked: PropTypes.func,
  onCheck: PropTypes.func
}

Checkbox.defaultProps = {
  className: "",
  checked: false,
  setChecked: () => console.log(logger + 'setChecked'),
  onCheck: () => console.log(logger + 'onCheck'),
}

export default Checkbox;


