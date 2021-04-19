import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Button } from '../../components';

import './_landing.scss';

const logger = "Landing:: ";

const Landing = (props) => {
  let classes = {
		[`landing`]: true
	};

  return (
    <Container fluid className={`${props.className} ${classnames(classes)} full center`}>
      <Row>
        <Col className="center">
          <Card kind="light" className="text-center p-5">
            <h1 className="title">INSTAPLAN</h1>
            <h5 className="subtitle">Hi, I'm Jordan McCollam and this is my version of a Trello-like app or bug tracker. With Instaplan, you can manage projects and tasks with a fun and easy to use interface.</h5>
            <Button onClick={props.login} size="md" kind="danger" className="mx-auto mt-4" >LOGIN / SIGNUP</Button>
          </Card>
        </Col>  
      </Row>
    </Container>
  )
}

Landing.propTypes = {
  className: PropTypes.string,
  login: PropTypes.func
}

Landing.defaultProps = {
  className: "",
  login: () => console.log(logger + 'login')
}

export default Landing;


