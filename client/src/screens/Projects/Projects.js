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
  const [ edit, setEdit ] = useState(null);
  let classes = {
		[`projects`]: true
	};

  const onSelectProject = (project, shared) => {
    console.log(logger + 'onSelectProject', project)
    props.setProject({...project, shared});
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
        projects: [res.data.output, ...prev.projects]
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

  const toggleEdit = (project) => {
    if (edit || !project) {
      setEdit(null);
    } else {
      setEdit(project);
    }
  }

  const onEdit = (e) => {
    setEdit(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const confirmEdit = () => {
    console.log(logger + 'confirmEdit', edit);
    api.updateProject(props.user.token, edit._id, {name: edit.name, description: edit.description}).then(res => {
      console.log(logger + 'confirmEdit: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: [{...res.data.output, items: edit.items}, ...prev.projects.filter(p => p._id !== edit._id)]
      }))
    }).catch(e => {
      console.log(logger + 'confirmEdit: ERROR', e);
    })
    toggleEdit();
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={(add || edit) ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="danger" 
          title={`Hello, ${props.user.nickname}`} 
          subtitle="Manage your projects here" 
          className="slide-top"
        />

        <Row className="mt-2 slide-top-random align-items-center">
          <Col>
            <h5 className="ml-3">Your Projects</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={toggleNew} size="md" ><>Add Project <Icon name="BsPlus"/></></Button>
          </Col>
        </Row>

        <Row className="projects-row">
          {props.user.projects.map((project, i) => (
            <Col lg={3} key={`project-${project._id}`} id={project._id} className="slide-top-random">
              <Project  
                project={project}
                onSelect={() => onSelectProject(project, false)}
                onDelete={() => onDelete(project)}
                onEdit={() => toggleEdit(project)}
              />
            </Col>
          ))}
        </Row>

        <Row className="mt-2 slide-top-random align-items-center">
          <h5 className="ml-3">Projects Shared With You</h5>
        </Row>
        <Row className="projects-row">
          {props.user.shared.map((project, i) => (
            <Col lg={3} key={`project-${project._id}`} id={project._id} className="slide-top-random">
              <Project  
                project={project}
                onSelect={() => onSelectProject(project, true)}
                onDelete={() => onDelete(project)}
                onEdit={() => toggleEdit(project)}
                shared
              />
            </Col>
          ))}
        </Row>

      </Col>
      <Col className={`slide-left ${add ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Add Project</h2>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={add?.name} onChange={onAdd} />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" name="description" value={add?.description} onChange={onAdd} />
        <Button onClick={confirmAdd} size="md" kind="danger" full className="mt-4" ><>Add Project <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleNew} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col className={`slide-left ${edit ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Edit {edit?.name}</h2>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={edit?.name} onChange={onEdit} />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" name="description" value={edit?.description} onChange={onEdit} />
        <Button onClick={confirmEdit} size="md" kind="danger" full className="mt-4" ><>Confirm Edit</></Button>
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
  user: {nickname: 'USER', token: 'test', _id: '123', projects: [], items: []}
}

export default Projects;


