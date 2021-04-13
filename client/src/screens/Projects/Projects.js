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
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={8} className="p-4">
        <Hero 
          kind="danger" 
          title={`Projects`} 
          subtitle="Manage your projects here" 
        />
      </Col>
      <Col className="full bg-light">
      
      </Col>
    </Row>
  )
}

Projects.propTypes = {
  className: PropTypes.string
}

Projects.defaultProps = {
  className: ""
}

export default Projects;


