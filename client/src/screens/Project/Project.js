import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Hero, Section, Item } from '../../components';

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

const ProjectScreen = (props) => {
  let classes = {
		[`project-screen`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col className="p-4">
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
              <Section section={section} id={`section-${i}`} >
                <>
                  {testItems.map((item, item_i) => (
                    <Item key={`section-${i}-item-${item_i}`} id={`section-${i}-item-${item_i}`} data={item} />
                  ))}
                </>
              </Section>
            </Col>
          ))}
        </Row>
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


