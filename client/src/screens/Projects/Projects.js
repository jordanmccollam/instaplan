import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Hero, Project } from '../../components';

import './_projects.scss';

const logger = "Projects:: ";

const testProjects = [
  {
    label: 'Project 1',
    description: 'This is a description. This one is longer than the rest.'
  },
  {
    label: 'Project 2',
    description: 'This is a description'
  },
  {
    label: 'Project 3',
    description: 'This is a description'
  },
  {
    label: 'Project 4',
    description: 'This is a description'
  },
  {
    label: 'Project 5',
    description: 'This is a description'
  },
  {
    label: 'Project 6',
    description: 'This is a description'
  },
  {
    label: 'Project 7',
    description: 'This is a description'
  },
  {
    label: 'Project 8',
    description: 'This is a description'
  },
]

const Projects = (props) => {
  let classes = {
		[`projects`]: true
	};

  const addProject = () => {
    console.log(logger + 'addProject');
  }

  const onSelectProject = (project) => {
    console.log(logger + 'onSelectProject', project)
    props.setProject(project);
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={9} className="p-4">
        <Hero 
          kind="danger" 
          title={`Projects`} 
          subtitle="Manage your projects here" 
          className="slide-top"
        />

        <Row className="mt-3">
          {testProjects.map((project, i) => (
            <Col lg={3} key={`project-${i}`} className="slide-top-random">
              <Project  
                project={project}
                onSelect={() => onSelectProject(project)}
              />
            </Col>
          ))}
        </Row>

      </Col>
      <Col className="full bg-white">
      
      </Col>
    </Row>
  )
}

Projects.propTypes = {
  className: PropTypes.string,
  setProject: PropTypes.func
}

Projects.defaultProps = {
  className: "",
  setProject: () => console.log(logger + 'setProject')
}

export default Projects;


