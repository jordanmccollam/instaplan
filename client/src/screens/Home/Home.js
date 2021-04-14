import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Hero, Section, Item, Project } from '../../components';
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

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col className="p-4">
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
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={4} className="slide-top-random">
            <Section section={'Todo'} id={'Todo'} hideBtns >
              <>
                {props.user.items.filter(t => t.section === 'Todo').map((item, item_i) => (
                  <Item key={`section-home-item-${item_i}`} id={`section-home-item-${item_i}`} data={item} />
                ))}
              </>
            </Section>
          </Col>
        </Row>
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
  user: {nickname: 'USER'}
}

export default Home;


