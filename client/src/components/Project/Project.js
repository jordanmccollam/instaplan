import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Icon } from '../index';

import './_project.scss';

const logger = "Project:: ";

const Project = (props) => {
  let classes = {
		[`project`]: true
	};

  return (
    <div onClick={props.onSelect} className={`${props.className} ${classnames(classes)}`} >
      <Card kind={props.kind} className="project-card" >
        <Icon name="BsFileEarmarkText" size={props.size} />
        <h4 className="project-title">{props.label}</h4>
        <div className="project-description">{props.description}</div>
      </Card>
    </div>
  )
}

Project.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'success', 'danger', 'default', 'ghost']),
  size: PropTypes.number,
  label: PropTypes.string,
  description: PropTypes.string,
  onSelect: PropTypes.func
}

Project.defaultProps = {
  className: "",
  kind: 'ghost',
  size: 30,
  label: 'Default Label',
  description: 'Default Description',
  onSelect: () => console.log(logger + 'onSelect')
}

export default Project;


