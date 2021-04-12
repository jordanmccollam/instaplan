import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '../../components';

import './_projects.scss';

const logger = "Projects:: ";

const Projects = (props) => {
  let classes = {
		[`projects`]: true
	};

  const addProject = () => {
    console.log(logger + 'addProject');
  }

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
      <Hero 
        kind="danger" 
        title={`Projects`} 
        subtitle="Manage projects here" 
        button={{icon: 'GoPlus', handler: addProject}} 
      />
    </div>
  )
}

Projects.propTypes = {
  className: PropTypes.string
}

Projects.defaultProps = {
  className: ""
}

export default Projects;


