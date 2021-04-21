import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import './_profile.scss';

const logger = "Profile:: ";

const Profile = (props) => {
  let classes = {
		[`profile`]: true
	};

  return (
    <OverlayTrigger placement={props.position} overlay={
      <Tooltip id={props.id} >
        {props.content}
      </Tooltip>
    } >
      <div className={`${props.className} ${classnames(classes)}`}>
        <div>{props.content.charAt(0).toUpperCase()}</div>
      </div>
    </OverlayTrigger>
  )
}

Profile.propTypes = {
  className: PropTypes.string,
  position: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string
}

Profile.defaultProps = {
  className: "",
  position: 'bottom',
  id: 'default-tooltip-id',
  content: 'Default Tooltip Content'
}

export default Profile;


