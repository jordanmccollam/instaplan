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

  const onDelete = () => {
    console.log(logger + 'onDelete', props.project);
  }

  return (
    <div className={`${props.className} ${classnames(classes)}`} >
      <Card onClick={props.onSelect} kind={props.kind} className="project-card" >
        <>
          <Icon name="BsFileEarmarkText" size={props.size} />
          <h4 className="project-title">{props.project.label}</h4>
          <div className="project-description">{props.project.description}</div>
        </>
      </Card>

      <div className="project-actions">
        <div onClick={onDelete} ><Icon name="BsTrash" className="project-action" /></div>
      </div>
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
  project: PropTypes.object,
  onSelect: PropTypes.func
}

Project.defaultProps = {
  className: "",
  kind: 'ghost',
  size: 30,
  object: {label: 'Default Project', description: 'This a description'},
  onSelect: () => console.log(logger + 'onSelect')
}

export default Project;


