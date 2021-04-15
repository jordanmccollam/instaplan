import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Card, Hero, Section, Item, Button, Icon } from '../../components';
import * as api from '../../api';

import './_project.scss';

const logger = "ProjectScreen:: ";

const testItems = [
  {
    label: 'Do something'
  },
  {
    label: 'Do something else'
  },
]

const testSections = [
  {
    label: 'Todo',
    items: testItems
  },
  {
    label: 'In-Progress',
    items: testItems
  },
  {
    label: 'Done',
    items: testItems
  },
]

const initialAdd = {
  name: '',
  dueDate: '',
  section: '',
  done: false,
  tags: []
}

const ProjectScreen = (props) => {
  const [ add, setAdd ] = useState(null);
  let classes = {
		[`project-screen`]: true
	};

  const toggleNew = (section) => {
    if (add) {
      setAdd(null);
    } else {
      setAdd({...initialAdd, section});
    }
  }

  const confirmAdd = () => {
    api.createItem(props.user.token, {
      ...add,
      user: props.user._id,
      project: props.project._id
    }).then(res => {
      console.log(logger + 'confirmAdd: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: prev.projects.map(p => p._id === props.project._id ? {...p, items: [res.data.output, ...p.items]} : p),
        items: [res.data.output, ...prev.items]
      }))
      props.setProject(prev => ({
        ...prev,
        items: [res.data.output, ...prev.items]
      }))
    }).catch(e => {
      console.log(logger + 'confirmAdd: ERROR', e);
    })
    toggleNew();
  }

  const onAdd = (e) => {
    setAdd(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onDelete = (item) => {
    console.log(logger + 'onDelete', item);
    api.deleteItem(props.user.token, item._id).then(res => {
      console.log(logger + 'onDelete: res', res);
      props.user.update(prev => ({
        ...prev,
        items: prev.items.filter(p => p._id !== item._id),
        projects: prev.projects.map(p => p._id === props.project._id ? p.items.filter(t => t._id !== item._id) : p)
      }))
      props.setProject(prev => ({
        ...prev,
        items: prev.items.filter(p => p._id !== item._id)
      }))
    }).catch(e => {
      console.log(logger + 'onDelete: ERROR', e);
    })
  }

  const onUpdateItem = (section, item) => {
    console.log(logger + 'onUpdateItem', section, item);
    api.updateItem(props.user.token, item._id, section === 'Done' ? {section: section, done: true} : {section: section, done: 'false'}).then(res => {
      console.log(logger + 'onUpdateItem: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: prev.projects.map(p => p._id === props.project._id ? {...p, items: [res.data.output, ...p.items.filter(t => t._id !== item._id)]} : p),
        items: [res.data.output, ...prev.items.filter(t => t._id !== item._id)]
      }))
      props.setProject(prev => ({
        ...prev,
        items: [res.data.output, ...prev.items.filter(t => t._id !== item._id)]
      }))
    }).catch(e => {
      console.log(logger + 'onUpdateItem: ERROR', e);
    })
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={add ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="success" 
          title={`${props.project.name}`} 
          subtitle={`${props.project.description}`} 
          links={[{label: 'Projects', action: () => props.setProject(null)}]}
          className="slide-top"
        />

        <Row className="mt-3 project-screen-sections">
          {props.project.sections.map((section, i) => (
            <Col key={`${props.project._id}-${section}`} className="slide-top-random" >
              <Section section={section} onAdd={() => toggleNew(section)} id={section} onUpdateItem={onUpdateItem} >
                <>
                  {props.project.items.filter(t => t.section === section).map((item, item_i) => (
                    <Item key={item._id} id={item._id} data={item} onDelete={() => onDelete(item)} onCheck={() => onUpdateItem('Done', item)} />
                  ))}
                </>
              </Section>
            </Col>
          ))}
        </Row>
      </Col>

      <Col className={`slide-left ${add ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Add {add?.section} Item</h2>
        <Form.Label >Item Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={add?.name} onChange={onAdd} />
        {/* <Form.Label className="mt-3" >Due Date</Form.Label>
        <Form.Control placeholder="MM/DD/YYYY" name="dueDate" value={add?.dueDate} /> */}
        <Button onClick={confirmAdd} size="md" kind="success" full className="mt-4" ><>Add Item <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleNew} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
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
  project: {name: 'Default Project', description: 'Description here...'},
  setProject: () => console.log(logger + 'setProject')
}

export default ProjectScreen;


