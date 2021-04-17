import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './_test.scss';

const logger = "Test:: ";

const Test = (props) => {
  let classes = {
		[`test`]: true
	};

  const testList = [
    {checked: false, name: 'Do something', id: '1'},
    {checked: false, name: 'Do something', id: '2'},
    {checked: false, name: 'Do something', id: '3'},
    {checked: false, name: 'Do something', id: '4'},
  ]

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
      <DragDropContext>
        <div>
        <Droppable droppableId="mylist" >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} >
              {testList.map((item, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i} >
                  {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

Test.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string
}

Test.defaultProps = {
  className: ""
}

export default Test;


