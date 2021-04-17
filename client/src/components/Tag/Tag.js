import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_tag.scss';

const logger = "Tag:: ";

const Tag = (props) => {
  let classes = {
		[`tag`]: true,
		[`tag-${props.kind}`]: true,
	};

  const renderTag = () => {
    switch(props.kind) {
      // (primary)
      default: 
        return 'In Review'
      case 'danger':
        return 'BUG'
      case 'success':
        return 'Testing'
    }
  }

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
      {renderTag()}
    </div>
  )
}

Tag.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'danger', 'success'])
}

Tag.defaultProps = {
  className: "",
  kind: 'primary',
  label: 'Tag'
}

export default Tag;


