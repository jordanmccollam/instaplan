import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Hero, Section, Item, Project } from '../../components';

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

const Home = (props) => {
  let classes = {
		[`home`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col className="p-4">
        <Hero 
          kind="primary" 
          title={`Hello, USER`} 
          subtitle="This is your dashboard. It gives you a quick view of everything you need to see." 
          className="slide-top"
        />

        <Row className="mt-3 slide-top">
          <Col>
            <h4 className="pl-3 my-0">Recent Projects</h4>
            <Row>
              {testProjects.slice(0, 3).map((project, i) => (
                <Col lg={4} key={`project-home-${i}`} className="slide-top-random">
                  <Project 
                    project={project}
                    onSelect={() => console.log(logger + 'onSelect Project', project)} 
                  />
                </Col>
              ))}
            </Row>
            <h4 className="pl-3 my-0">Teammates</h4>
            <Row>
              {testProjects.slice(0, 3).map((project, i) => (
                <Col lg={4} key={`friend-home-${i}`} className="slide-top-random">
                  <Project 
                    project={project}
                    onSelect={() => console.log(logger + 'onSelect Project', project)} 
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={4} className="slide-top-random">
            <Section section={testSections[0]} id={`section-home}`} >
              <>
                {testSections[0].items.map((item, item_i) => (
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
  className: PropTypes.string
}

Home.defaultProps = {
  className: ""
}

export default Home;


