import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Icon, Logo, Card } from '../index';

import './_menu.scss';

const logger = "Menu:: ";

const iconSize = '1.5vw';
const iconColor = 'white';

const Menu = (props) => {
  let classes = {
		[`menu`]: true
	};

  const screens = [
    {name: 'home', icon: 'GoHome', size: iconSize},
    {name: 'projects', icon: 'BsFolder', size: iconSize},
  ]

  const changeScreen = (screen) => {
    console.log(logger + 'changeScreen: ' + screen);
    props.setScreen(screen);
  }

  return (
    <Card className={`${props.className} ${classnames(classes)}`}>
      <>
        <Logo size={'1.3vw'} />

        <div className="mb-5" />

        <div className="menu-navigation">
          {screens.map((screen, i) => (
            <div 
              key={`screen-${i}`} 
              onClick={() => changeScreen(screen.name)} 
            >
              <Icon name={screen.icon} size={screen.size} color={iconColor} className={`menu-item ${props.screen === screen.name && 'active'}`}    />
            </div>
          ))}
        </div>
        <div className="menu-footer">
          <div 
            onClick={props.logout} 
          >
            <Icon name={'FiLogOut'} size={iconSize} color={iconColor} className={`menu-item`}    />
          </div>
        </div>
      </>
    </Card>
  )
}

Menu.propTypes = {
  className: PropTypes.string,
  screen: PropTypes.string,
  setScreen: PropTypes.func,
  logout: PropTypes.func
}

Menu.defaultProps = {
  className: "",
  screen: 'home',
  setScreen: () => console.log(logger + 'setScreen'),
  logout: () => console.log(logger + 'logout'),
}

export default Menu;


