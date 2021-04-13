import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Card, Checkbox } from '../index';

import './_item.scss';

const logger = "Item:: ";

const Item = (props) => {
  const [ completed, setCompleted ] = useState(false);
  let classes = {
		[`item`]: true
	};

  return (
    <Card kind="ghost" className={`${props.className} ${classnames(classes)}`}>
      <>
        <Row>
          <Col xs={3} className="mx-0 pt-1 center-h">
            <Checkbox checked={completed} setChecked={setCompleted} />
          </Col>
          <Col className="pl-0">
            <div>Make an item component. This item has lots of text</div>
          </Col>
        </Row>
      </>
    </Card>
  )
}

Item.propTypes = {
  className: PropTypes.string,
}

Item.defaultProps = {
  className: ""
}

export default Item;


