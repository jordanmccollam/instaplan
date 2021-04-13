import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Hero } from '../../components';

import './_home.scss';

const logger = "Home:: ";

const Home = (props) => {
  let classes = {
		[`home`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={8} className="p-4">
        <Hero 
          kind="primary" 
          title={`Hello, USER`} 
          subtitle="This is your dashboard. It gives you a quick view of everything you need to see." 
        />
      </Col>
      <Col className="full bg-light">
      
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


