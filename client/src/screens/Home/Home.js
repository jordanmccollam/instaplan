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
    <div className={`${props.className} ${classnames(classes)}`}>
      <Hero 
        kind="success" 
        title={`Hello, USER`} 
        subtitle="This is your dashboard. It gives you a quick view of everything you need to see." 
      />
    </div>
  )
}

Home.propTypes = {
  className: PropTypes.string
}

Home.defaultProps = {
  className: ""
}

export default Home;


