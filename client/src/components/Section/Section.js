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

  const drop = (e) => {
    e.preventDefault();
    const item_id = e.dataTransfer.getData('item_id');
    const item_data = e.dataTransfer.getData('item');
    console.log("ITEM DATA", item_data);

    const item = document.getElementById(item_id);
    item.style.display = 'block';

    e.target.appendChild(item);
  }

  const dragOver = (e) => {
    e.preventDefault();
  }

  return (
    <Card kind="light" className={`${props.className} ${classnames(classes)}`} >
      <>
        <div className="d-flex justify-content-between">
          <h5>{props.section}</h5>
          <div className="d-flex">
            <Button onClick={props.onAdd} className="ml-2" ><Icon name="BsPlus" /></Button>
            <Button className="ml-2" ><Icon name="BsThreeDots" /></Button>
          </div>
        </div>

        <div className="mt-2 section-dnd" id={props.id} onDrop={drop} onDragOver={dragOver}>
          {props.children}
        </div>
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
  section: PropTypes.string,
  onAdd: PropTypes.func
}

Section.defaultProps = {
  className: "",
  section: 'Todo',
  onAdd: () => console.log(logger + 'onAdd')
}

export default Section;


