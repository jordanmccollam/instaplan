import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Hero, Section } from '../../components';

import './_project.scss';

const logger = "ProjectScreen:: ";

const testSections = [
  {
    label: 'Todo'
  },
  {
    label: 'In-Progress'
  },
  {
    label: 'Done'
  },
]

const ProjectScreen = (props) => {
  let classes = {
		[`project-screen`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={9} className="p-4">
        <Hero 
          kind="success" 
          title={`${props.project.label}`} 
          subtitle={`Manage ${props.project.description}`} 
          links={[{label: 'Projects', action: () => props.setProject(null)}]}
          className="slide-top"
        />

        <Row className="mt-3 project-screen-sections">
          {testSections.map((section, i) => (
            <Col key={`section-${i}`} className="slide-top-random" >
              <Section section={section} />
            </Col>
          ))}
        </Row>
      </Col>

      <Col className="full bg-white">
      
      </Col>
    </Row>
  )
}

ProjectScreen.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object,
  setProject: PropTypes.func
}

ProjectScreen.defaultProps = {
  className: "",
  project: {label: 'Default Project', description: 'Description here...'},
  setProject: () => console.log(logger + 'setProject')
}

export default ProjectScreen;


