import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Card, Hero, Section, Item, Button, Icon, Tag, Checkbox, Profile } from '../../components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as api from '../../api';

import './_project.scss';

const logger = "ProjectScreen:: ";

const initialAdd = {
  name: '',
  dueDate: '',
  section: '',
  done: false,
  tags: []
}

const ProjectScreen = (props) => {
  const [ edit, setEdit ] = useState(null);
  const [ add, setAdd ] = useState(null);
  const [ newUser, setNewUser ] = useState(null);
  const [ targetSection, setTargetSection ] = useState(null);
  const [ removeUser, setRemoveUser ] = useState(null);
  const [ assignItem, setAssignItem ] = useState(false);
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
    api.updateItem(props.user.token, edit._id, {name: edit.name, tags: edit.tags}).then(res => {
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

  const toggleTag = (tag, func) => {
    func(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? [...prev.tags.filter(t => t !== tag)] : [...prev.tags.filter(t => t !== tag), tag]
    }))
  }

  const toggleNewUser = () => {
    console.log(logger + 'toggleNewUser');
    if (newUser) {
      setNewUser(null);
    } else {
      setNewUser(prev => ({
        ...prev,
        email: ''
      }))
    }
  }

  const confirmNewUser = async () => {
    api.getUser(props.user.token, newUser.email).then(target => {
      if (target.data.output) {

        api.updateProject(props.user.token, props.project._id, {collaborator: {user: target.data.output, action: 'add'}}).then(res => {
          console.log(logger + 'confirmNewUser: updateProject', res);
          const updatedProject = {...props.project, collaborators: res.data.collaborators};
          props.setProject(updatedProject);
          props.user.update(prev => ({...prev, projects: [...prev.projects.filter(p => p._id !== updatedProject._id), updatedProject]}));
        }).catch(e => {
          console.log(logger + 'confirmNewUser: updateProject', e);
        })

        api.updateUser(props.user.token, newUser.email, {shared: {project: props.project, action: 'add'}}).then(res => {
          console.log(logger + 'confirmNewUser: updateUser', res);
        }).catch(e => {
          console.log(logger + 'confirmNewUser: updateUser', e);
        })
        if (newUser.error) {
          setNewUser(prev => ({...prev, error: null}))
        }
      } else {
        console.log(logger + 'confirmNewUser: No user found');
        setNewUser(prev => ({...prev, error: 'No user found'}));
      }
    }).catch(e => {
      console.log(logger + 'confirmNewUser', e);
    });
  }

  const onChangeNewUser = (e) => {
    setNewUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleRemoveUser = (user) => {
    console.log(logger + 'toggleRemoveUser');
    if (removeUser) {
      setRemoveUser(null);
    } else {
      setRemoveUser(user);
    }
  }

  const confirmRemoveUser = () => {
    console.log(logger + 'confirmRemoveUser', removeUser);
    api.updateProject(props.user.token, props.project._id, {collaborator: {user: removeUser, action: 'remove'}}).then(res => {
      console.log(logger + 'confirmRemoveUser: updateProject', res);
      const updatedProject = {...props.project, collaborators: res.data.collaborators};
      props.setProject(updatedProject);
      props.user.update(prev => ({...prev, projects: [...prev.projects.filter(p => p._id !== updatedProject._id), updatedProject]}));
    }).catch(e => {
      console.log(logger + 'confirmRemoveUser: updateProject', e);
    })
    api.updateUser(props.user.token, removeUser.email, {shared: {project: props.project, action: 'remove'}}).then(res => {
      console.log(logger + 'confirmRemoveUser: updateUser', res);
    }).catch(e => {
      console.log(logger + 'confirmRemoveUser: updateUser', e);
    })
  }

  const onAssignItem = (e) => {
    console.log(logger + 'onAssignItem', e.target.value);
    if (e.target.value !== 'none') {
      const value = JSON.parse(e.target.value);
      api.updateItem(props.user.token, assignItem._id, {assignee: value}).then(res => {
        console.log(logger + 'onAssignItem', res);
        const updatedProject = {
          ...props.project,
          items: [...props.project.items.filter(i => i._id !== res.data.output._id), {...res.data.output, assignee: res.data.assignee}]
        }
        props.setProject(updatedProject);
        props.user.update(prev => ({...prev, projects: [...prev.projects.filter(p => p._id !== props.project._id), updatedProject]}));
        setAssignItem({...res.data.output, assignee: res.data.assignee});
      }).catch(e => {console.log(logger + 'onAssignItem', e)})
    } else {
      api.updateItem(props.user.token, assignItem._id, {assignee: null}).then(res => {
        const updatedProject = {
          ...props.project,
          items: [...props.project.items.filter(i => i._id !== res.data.output._id), {...res.data.output, assignee: res.data.assignee}]
        }
        props.setProject(updatedProject);
        props.user.update(prev => ({...prev, projects: [...prev.projects.filter(p => p._id !== props.project._id), updatedProject]}));
        setAssignItem({...res.data.output, assignee: res.data.assignee});
      })
    }
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={(add || edit || newUser || removeUser || assignItem) ? 9 : 12} className="p-4 projects-col">
        <Hero 
          kind="success" 
          title={`${props.project.name}`} 
          subtitle={`${props.project.description}`} 
          links={[{label: 'Projects', action: () => props.setProject(null)}]}
          className="slide-top"
        >
          <div className="project-screen-profiles">
            {props.project.collaborators && props.project.collaborators.map((profile, i) => (
              <div key={`collaborator-${profile._id}`} className="ml-2" onClick={() => props.project.shared ? console.log(logger + 'toggleRemoveUser: not authorized') : toggleRemoveUser(profile)}><Profile content={profile.email} id={profile._id} /></div>
            ))}
            <Profile className="ml-2" content={`${props.project.user.email} (owner)`} id={props.user._id} />
            {!props.project.shared && (<div onClick={toggleNewUser}><Profile className="ml-2" content={`+ Add a collaborator`} id={'new-user'} /></div>)}
          </div>
        </Hero>

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
                                <Item data={item} id={item._id} onCheck={() => onUpdateItem('Done', item)} onEdit={() => toggleEdit(item)} onDelete={() => onDelete(item)} addAssignee={() => setAssignItem(item)} />
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
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('In Review')} onCheck={() => toggleTag('In Review', setAdd)} /></Col><Col><Tag kind="primary" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('BUG')} onCheck={() => toggleTag('BUG', setAdd)} /></Col><Col><Tag kind="danger" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={add?.tags.includes('Testing')} onCheck={() => toggleTag('Testing', setAdd)} /></Col><Col><Tag kind="success" className="mt-1" /></Col></Row>
        <Button onClick={confirmAdd} size="md" kind="success" full className="mt-4" ><>Add Item <Icon name="BsPlus"/></></Button>
        <Button onClick={toggleNew} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col className={`slide-left ${edit ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Edit {edit?.name}</h2>
        <Form.Label >Item Name</Form.Label>
        <Form.Control placeholder="Name" name="name" value={edit?.name} onChange={onEdit} />
        <Form.Label className="mt-3" >Tags</Form.Label>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('In Review')} onCheck={() => toggleTag('In Review', setEdit)} /></Col><Col><Tag kind="primary" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('BUG')} onCheck={() => toggleTag('BUG', setEdit)} /></Col><Col><Tag kind="danger" className="mt-1" /></Col></Row>
        <Row className="center"><Col xs={2} className="center-h"><Checkbox checked={edit?.tags.includes('Testing')} onCheck={() => toggleTag('Testing', setEdit)} /></Col><Col><Tag kind="success" className="mt-1" /></Col></Row>
        <Button onClick={confirmEdit} size="md" kind="success" full className="mt-4" ><>Confirm Edit</></Button>
        <Button onClick={toggleEdit} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col className={`slide-left ${newUser ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Add Collaborator</h2>
        <div className="text-danger">{newUser?.error}</div>
        <Form.Label >User Email</Form.Label>
        <Form.Control placeholder="Email" name="email" value={newUser?.email} onChange={onChangeNewUser} />
        <Button onClick={confirmNewUser} size="md" kind="success" full className="mt-4" ><>Confirm</></Button>
        <Button onClick={toggleNewUser} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col xs={3} className={`slide-left ${removeUser ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h4>Do you want to remove {removeUser?.email} from this project?</h4>
        <Button onClick={confirmRemoveUser} size="md" kind="danger" full className="mt-4" ><>Yes, remove them.</></Button>
        <Button onClick={toggleRemoveUser} size="md" kind="dark" full className="mt-2" ><>Cancel</></Button>
      </Col>
      <Col className={`slide-left ${assignItem ? 'd-block' : 'd-none'} projects-col projects-sidebar`}>
        <h2>Assign User to Item</h2>
        <Form.Label>Assignee</Form.Label>
        <Form.Control as="select" custom onChange={onAssignItem} value={JSON.stringify(assignItem?.assignee)}>
          <option value={'none'} >None</option>
          <option value={JSON.stringify(props.project.user)} >{props.project.user.email}</option>
          {props.project.collaborators.map((user, i) => (
            <option key={`add-assignee-${i}`} value={JSON.stringify(user)} >{user.email}</option>
          ))}
        </Form.Control>
        <Button onClick={() => setAssignItem(null)} size="md" kind="dark" full className="mt-2" ><>Close</></Button>
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
  project: {name: 'Default Project', description: 'Description here...', sections: ['Todo', 'In-Progress', 'Done'], items: [], collaborators: []},
  setProject: () => console.log(logger + 'setProject')
}

export default ProjectScreen;


