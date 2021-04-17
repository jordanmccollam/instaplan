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
        <div className="d-flex justify-content-between">
          <h5>{props.section}</h5>
          <div className={`${props.hideBtns ? "d-none" : "d-flex"}`}>
            <Button onClick={props.onAdd} className="ml-2" ><Icon name="BsPlus" /></Button>
            {/* <Button className="ml-2" ><Icon name="BsThreeDots" /></Button> */}
          </div>
        </div>

        <div className="mt-2 section-dnd">
          {props.children}
        </div>
      </>
    </Card>
  )
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  className: PropTypes.string,
  section: PropTypes.string,
  onAdd: PropTypes.func,
  hideBtns: PropTypes.bool
}

Section.defaultProps = {
  className: "",
  section: 'Todo',
  onAdd: () => console.log(logger + 'onAdd'),
  hideBtns: false
}

export default Section;


