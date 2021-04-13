import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Icon, Button, Item } from '../index';

import './_section.scss';

const logger = "Section:: ";

const Section = (props) => {
  let classes = {
		[`section`]: true
	};

  return (
    <Card kind="light" className={`${props.className} ${classnames(classes)}`} >
      <>
        <div className="d-flex justify-content-between mb-2">
          <h5>{props.section.label}</h5>
          <div className="d-flex">
            <Button className="ml-2" ><Icon name="BsPlus" /></Button>
            <Button className="ml-2" ><Icon name="BsThreeDots" /></Button>
          </div>
        </div>

        <Item />
      </>
    </Card>
  )
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  section: PropTypes.object
}

Section.defaultProps = {
  className: "",
  section: {label: 'Default Section'}
}

export default Section;


