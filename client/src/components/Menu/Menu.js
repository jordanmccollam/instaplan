import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Icon, Logo, Card } from '../index';

import './_menu.scss';

const logger = "Menu:: ";

const iconSize = '2vw';
const iconColor = 'white';

const Menu = (props) => {
  let classes = {
		[`menu`]: true
	};

  return (
    <Card className={`${props.className} ${classnames(classes)}`}>
      <Logo color="white" break size={'2.3vw'} />

      <div className="mb-5" />

      <div className="menu-navigation">
        <Icon size={iconSize} color={iconColor} className="menu-item" />
        <Icon size={iconSize} color={iconColor} className="menu-item" />
      </div>
    </Card>
  )
}

Menu.propTypes = {
  className: PropTypes.string,
}

Menu.defaultProps = {
  className: "",
}

export default Menu;


