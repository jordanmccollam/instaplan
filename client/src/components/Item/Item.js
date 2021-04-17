import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Checkbox, Button, Icon } from '../index';
import { Draggable } from 'react-beautiful-dnd';

import './_item.scss';

const logger = "Item:: ";

const Item = (props) => {
  const [ completed, setCompleted ] = useState(false);
  let classes = {
		[`item`]: true
	};

  const dragStart = e => {
    const target = e.target;
    // e.dataTransfer.setData('item', target.getAttribute('data'));

    // setTimeout(() => {
    //   target.style.display = "none";
    // }, 0);
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  const dragEnd = (e) => {
    if (props.targetSection && props.targetSection !== undefined) {
      props.onUpdateItem(props.targetSection, JSON.parse(e.target.getAttribute('data')))
    } else {
      console.log(logger + 'ERROR dragEnd: No target section!');
    }
  }

  return (
    <div 
      // id={props.id}
      // onDragStart={dragStart}
      // onDragOver={dragOver}
      // onDragEnd={dragEnd}
      // draggable="true"
      // data={JSON.stringify(props.data)}
      className="slide-top-random item-container"
    >
      <Card kind="ghost" className={`${props.className} ${classnames(classes)}`}>
        <>
          <Row>
            <Col xs={2} className="pt-1 d-flex justify-content-end">
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
  hideActions: PropTypes.bool,
  onCheck: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Item.defaultProps = {
  className: "",
  data: {name: 'Default Item', done: false},
  id: '123',
  hideActions: false,
  onCheck: () => console.log(logger + 'onCheck'),
  onEdit: () => console.log(logger + 'onEdit'),
  onDelete: () => console.log(logger + 'onDelete'),
}

export default Item;


