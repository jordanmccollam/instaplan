import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Checkbox, Button, Icon } from '../index';

import './_item.scss';

const logger = "Item:: ";

const Item = (props) => {
  const [ completed, setCompleted ] = useState(false);
  let classes = {
		[`item`]: true
	};

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('item', target.getAttribute('data'));

    // setTimeout(() => {
    //   target.style.display = "none";
    // }, 0);
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  return (
    <div 
      id={props.id}
      onDragStart={dragStart}
      onDragOver={dragOver}
      draggable="true"
      className="slide-top-random item-container"
      data={JSON.stringify(props.data)}
    >
      <Card kind="ghost" className={`${props.className} ${classnames(classes)}`}>
        <>
          <Row>
            <Col xs={3} className="mx-0 pt-1 center-h">
              <Checkbox checked={props.data.done} onCheck={props.onCheck} />
            </Col>
            <Col className="pl-0">
              <div>{props.data.name}</div>
            </Col>
          </Row>

          <div className={`mt-2 justify-content-end align-items-center ${props.hideActions ? 'd-none' : 'd-flex'}`}>
            <Button onClick={props.onEdit} className="mr-1" ><><Icon name="BsPencil" /></></Button>
            <Button onClick={props.onDelete} ><><Icon name="BsTrash" /></></Button>
          </div>
        </>
      </Card>
    </div>
  )
}

Item.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.string,
  hideActions: PropTypes.bool
}

Item.defaultProps = {
  className: "",
  data: {label: 'Default Item'},
  id: '123',
  hideActions: false
}

export default Item;


