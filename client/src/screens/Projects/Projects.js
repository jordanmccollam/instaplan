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
  const [ add, setAdd ] = useState(null);
  let classes = {
		[`projects`]: true
	};

  const onSelectProject = (project) => {
    console.log(logger + 'onSelectProject', project)
    props.setProject(project);
  }

  const toggleNew = () => {
    if (add) {
      setAdd(null);
    } else {
      setAdd(initialEdit);
    }
  }

  const onAdd = (e) => {
    setAdd(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {console.log(props.user)}, [props.user])

  const confirmAdd = () => {
    api.createProject(props.user.token, {
      ...add,
      user: props.user._id
    }).then(res => {
      console.log(logger + 'confirmAdd: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: [...prev.projects, res.data.output]
      }))
    }).catch(e => {
      console.log(logger + 'confirmAdd: ERROR', e);
    })
    toggleNew();
  }

  const onDelete = (project) => {
    console.log(logger + 'onDelete', project);
    api.deleteProject(props.user.token, project._id).then(res => {
      console.log(logger + 'onDelete: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p._id !== project._id)
      }))
    }).catch(e => {
      console.log(logger + 'onDelete: ERROR', e);
    })
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={add ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="danger" 
          title={`Projects`} 
          subtitle="Manage your projects here" 
          className="slide-top"
        />

        <Row className="mt-2">
          <Col xs={12}>
            <Button onClick={toggleNew} size="md" ><>Add Project <Icon name="BsPlus"/></></Button>
          </Col>
          {props.user.projects.map((project, i) => (
            <Col lg={3} key={`project-${project._id}`} id={project._id} className="slide-top-random">
              <Project  
                project={project}
                onSelect={() => onSelectProject(project)}
                onDelete={() => onDelete(project)}
              />
            </Col>
          ))}
        </Row>

      </Col>
      <Col className={`slide-left ${add ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Add Project</h2>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={add?.label} onChange={onAdd} />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" name="description" value={add?.description} onChange={onAdd} />
        <Button onClick={confirmAdd} size="md" kind="danger" full className="mt-4" ><>Add Project <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleNew} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
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


