import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Checkbox, Button, Icon, Tag, Profile } from '../index';
import { Draggable } from 'react-beautiful-dnd';

import './_item.scss';

const logger = "Item:: ";

const Item = (props) => {
  const [ completed, setCompleted ] = useState(false);
  let classes = {
		[`item`]: true
	};

  const renderTag = (tag) => {
    switch(tag) {
      // In Review
      default: return 'primary';
      case 'BUG': return 'danger';
      case 'Testing': return 'success';
    }
  }

  return (
    <div className="slide-top-random item-container" id={props.id}>
      <Card kind="ghost" className={`${props.className} ${classnames(classes)}`}>
        <>
          <Row>
            <Col xs={2} className="pt-1 d-flex justify-content-end">
              <Checkbox checked={props.data.done} onCheck={props.onCheck} />
            </Col>
            <Col className="d-flex justify-content-end pr-4">
              {props.data.assignee ? (
                <div onClick={props.addAssignee}><Profile content={props.data.assignee.email} size="sm" position="top" /></div>
              ) : (
                <div onClick={props.addAssignee}><Profile content={'+ Assign'} size="sm" position="top" /></div>
              )}
            </Col>
          </Row>
          
          <div className="px-3">{props.data.name}</div>
          
          <div className="d-flex justify-content-end">
            {props.data.tags.map((tag, i) => (
              <Tag kind={renderTag(tag)} key={`${props.id}-tag-${i}`} className="ml-1" />
            ))}
          </div>

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
  addAssignee: PropTypes.func,
}

Item.defaultProps = {
  className: "",
  data: {name: 'Default Item', done: false},
  id: '123',
  hideActions: false,
  onCheck: () => console.log(logger + 'onCheck'),
  onEdit: () => console.log(logger + 'onEdit'),
  onDelete: () => console.log(logger + 'onDelete'),
  addAssignee: () => console.log(logger + 'addAssignee'),
}

export default Item;


