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
        projects: [res.data.output, ...prev.projects],
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
            <Col key={`section-${i}`} className="slide-top-random" >
              <Section section={section} onAdd={() => toggleNew(section)} id={`section-${i}`} >
                <>
                  {props.project.items.filter(t => t.section === section).map((item, item_i) => (
                    <Item key={`section-${i}-item-${item_i}`} id={`section-${i}-item-${item_i}`} data={item} />
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


