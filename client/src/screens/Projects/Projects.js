import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Hero, Project, Button, Icon } from '../../components';

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
  const [ editing, setEditing ] = useState(false);
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

  const toggleEdit = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={editing ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="danger" 
          title={`Projects`} 
          subtitle="Manage your projects here" 
          className="slide-top"
        />

        <Row className="mt-2">
          <Col xs={12}>
            <Button onClick={toggleEdit} size="md" ><>Add Project <Icon name="BsPlus"/></></Button>
          </Col>
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
      <Col className={`slide-left ${editing ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" />
        <Button size="md" kind="danger" full className="mt-4" ><>Add Project <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleEdit} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
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


