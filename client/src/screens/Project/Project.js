import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Card, Hero, Section, Item, Button, Icon, Tag, Checkbox } from '../../components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as api from '../../api';

import './_project.scss';

const logger = "ProjectScreen:: ";

const initialAdd = {
  name: '',
  dueDate: '',
  section: '',
  done: false,
  tags: ['BUG']
}

const ProjectScreen = (props) => {
  const [ edit, setEdit ] = useState(null);
  const [ add, setAdd ] = useState(null);
  const [ targetSection, setTargetSection ] = useState(null);
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
        projects: prev.projects.map(p => p._id === props.project._id ? {...p, items: p.items.filter(t => t._id !== item._id)} : p),
        items: prev.items.filter(t => t._id !== item._id)
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

  const toggleEdit = (item) => {
    if (edit || !item) {
      setEdit(null);
    } else {
      setEdit(item);
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
    api.updateItem(props.user.token, edit._id, {name: edit.name}).then(res => {
      console.log(logger + 'confirmEdit: res', res);
      props.user.update(prev => ({
        ...prev,
        projects: prev.projects.map(p => p._id === props.project._id ? {...p, items: [res.data.output, ...p.items.filter(t => t._id !== edit._id)]} : p),
        items: [res.data.output, ...prev.items.filter(t => t._id !== edit._id)],
      }))
      props.setProject(prev => ({
        ...prev,
        items: [res.data.output, ...prev.items.filter(t => t._id !== edit._id)]
      }))
    }).catch(e => {
      console.log(logger + 'confirmEdit: ERROR', e);
    })
    toggleEdit();
  }

  const onDragEnd = (res) => {
    if (!res.destination) return;
    console.log(logger + 'onDragEnd: res', res);
    const section = res.destination.droppableId;
    const item = JSON.parse(res.draggableId);
    if (section !== item.section) {
      document.getElementById(item._id).remove();
      onUpdateItem(section, item);
    } else {
      console.log(logger + 'onDragEnd: Already there!');
    }
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={(add || edit) ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="success" 
          title={`${props.project.name}`} 
          subtitle={`${props.project.description}`} 
          links={[{label: 'Projects', action: () => props.setProject(null)}]}
          className="slide-top"
        />

        <Row className="mt-3 fade-in">
          <DragDropContext onDragEnd={onDragEnd}>
            {props.project.sections.map((section, i) => (
              <Col xs={4} key={section} >
                <Droppable droppableId={section} type="ITEM" >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Section section={section} onAdd={() => toggleNew(section)} >
                        {props.project.items.filter(t => t.section === section).map((item, item_i) => (
                          <Draggable draggableId={JSON.stringify(item)} key={`${section}-${item._id}`} index={item_i} >
                            {(provided) => (
                              <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                <Item data={item} id={item._id} onCheck={() => onUpdateItem('Done', item)} onEdit={() => toggleEdit(item)} onDelete={() => onDelete(item)} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Section>
                    </div>
                  )}
                </Droppable>
              </Col>
            ))}
          </DragDropContext>
        </Row>
      </Col>

      <Col className={`slide-left ${add ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Add {add?.section} Item</h2>
        <Form.Label >Item Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={add?.name} onChange={onAdd} />
        <Form.Label className="mt-3" >Tags</Form.Label>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('In Review')} /></Col><Col><Tag kind="primary" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('BUG')} /></Col><Col><Tag kind="danger" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('Testing')} /></Col><Col><Tag kind="success" className="mt-1" /></Col></Row>
        <Button onClick={confirmAdd} size="md" kind="success" full className="mt-4" ><>Add Item <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleNew} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col className={`slide-left ${edit ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Edit {edit?.name}</h2>
        <Form.Label >Item Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={edit?.name} onChange={onEdit} />
        <Form.Label className="mt-3" >Tags</Form.Label>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('In Review')} /></Col><Col><Tag kind="primary" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('BUG')} /></Col><Col><Tag kind="danger" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('Testing')} /></Col><Col><Tag kind="success" className="mt-1" /></Col></Row>
        <Button onClick={confirmEdit} size="md" kind="success" full className="mt-4" ><>Confirm Edit</></Button>
        <Button onClick={toggleEdit} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
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
  project: {name: 'Default Project', description: 'Description here...', sections: ['Todo', 'In-Progress', 'Done'], items: []},
  setProject: () => console.log(logger + 'setProject')
}

export default ProjectScreen;


