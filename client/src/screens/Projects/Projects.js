import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Hero, Project, Button, Icon } from '../../components';
import * as api from '../../api/';

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

const initialEdit = {
  name: '',
  description: '',
  sections: ['Todo', 'In-Progress', 'Done']
}

const Projects = (props) => {
  const [ edit, setEdit ] = useState(null);
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
    if (edit) {
      setEdit(null);
    } else {
      setEdit(initialEdit);
    }
  }

  useEffect(() => { console.log(logger + 'user:', props.user); console.log(logger + 'edit: ', edit)}, [edit])

  const onEdit = (e) => {
    setEdit(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const confirmEdit = () => {
    api.createProject(props.user.token, {
      ...edit,
      user: props.user._id
    }).then(res => {
      console.log(logger + 'confirmEdit: res', res);
    }).catch(e => {
      console.log(logger + 'confirmEdit: ERROR', e);
    })
    toggleEdit();
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={edit ? 9 : 12} className="p-4 projects-col">
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
      <Col className={`slide-left ${edit ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={edit?.label} onChange={onEdit} />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" name="description" value={edit?.description} onChange={onEdit} />
        <Button onClick={confirmEdit} size="md" kind="danger" full className="mt-4" ><>Add Project <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleEdit} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
    </Row>
  )
}

Projects.propTypes = {
  className: PropTypes.string,
  setProject: PropTypes.func,
  user: PropTypes.object,
}

Projects.defaultProps = {
  className: "",
  setProject: () => console.log(logger + 'setProject'),
  user: {nickname: 'USER', token: 'test', _id: '123'}
}

export default Projects;


