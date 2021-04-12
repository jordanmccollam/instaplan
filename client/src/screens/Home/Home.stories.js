import React from 'react';
import Home from './Home';

export default {
  title: 'screens/Home',
  component: Home,
  argTypes: {

  }
}

const Template = (args) => <Home {...args} />

export const Default = Template.bind({})
Default.args = {

}

