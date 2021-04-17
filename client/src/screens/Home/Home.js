import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Hero, Section, Item, Project, Button } from '../../components';
import moment from 'moment';
import * as api from '../../api';

import './_home.scss';

const logger = "Home:: ";

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

const testItems = [
  {
    label: 'Do something'
  },
  {
    label: 'Do something else'
  },
]

const testSections = ['Todo', 'In-Progress', 'Done']

const Home = (props) => {
  const [ edit, setEdit ] = useState(null);
  let classes = {
		[`home`]: true
	};

  const onSelectProject = (project) => {
    console.log(logger + 'onSelectProject', project)
    props.setProject(project);
    props.setScreen('projects');
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

  const onCheck = (item) => {
    console.log(logger + 'onCheck', item);
    api.updateItem(props.user.token, item._id, {section: 'Done', done: true}).then(res => {
      console.log(logger + 'onCheck: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: prev.projects.map(p => p._id === item.project ? {...p, items: [res.data.output, ...p.items.filter(t => t._id !== item._id)]} : p),
        items: [res.data.output, ...prev.items.filter(t => t._id !== item._id)]
      }))
      if (props.project && props.project._id === item.project) {
        props.setProject(prev => ({
          ...prev,
          items: [res.data.output, ...prev.items.filter(t => t._id !== item._id)]
        }))
      }
    }).catch(e => {
      console.log(logger + 'onCheck: ERROR', e);
    })
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={(edit) ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="primary" 
          title={`Hello, ${props.user.nickname}`} 
          subtitle="This is your dashboard. It gives you a quick view of everything you need to see." 
          className="slide-top"
        />

        <Row className="mt-3 slide-top">
          <Col>
            <h4 className="pl-3 my-0">Recent Projects</h4>
            <Row>
              {props.user.projects.sort((a, b) => parseInt(moment(b.updatedAt).format('YYYYMMDDhhmm')) - parseInt(moment(a.updatedAt).format('YYYYMMDDhhmm'))).slice(0, 6).map((project, i) => (
                <Col lg={4} key={`project-home-${i}`} className="slide-top-random">
                  <Project 
                    project={project}
                    onSelect={() => onSelectProject(project)}
                    onDelete={() => onDelete(project)}
                    onEdit={() => toggleEdit(project)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={4} className="slide-top-random">
            <Section section={'Todo'} hideBtns >
              <>
                {props.user.items.filter(t => t.section === 'Todo').map((item, item_i) => (
                  <Item key={`section-home-item-${item_i}`} data={item} id={item._id} hideActions onCheck={() => onCheck(item)} />
                ))}
              </>
            </Section>
          </Col>
        </Row>
      </Col>
      <Col className={`slide-left ${edit ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Edit {edit?.name}</h2>
        <Form.Label >Project Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={edit?.name} onChange={onEdit} />
        <Form.Label className="mt-3" >Description</Form.Label>
        <Form.Control placeholder="Description" name="description" value={edit?.description} onChange={onEdit} />
        <Button onClick={confirmEdit} size="md" kind="primary" full className="mt-4" ><>Confirm Edit</></Button>
        <Button onClick={toggleEdit} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
    </Row>
  )
}

Home.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
}

Home.defaultProps = {
  className: "",
  user: {nickname: 'USER', projects: [], items: []}
}

export default Home;


