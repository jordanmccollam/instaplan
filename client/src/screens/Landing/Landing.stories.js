import React from 'react';
import Landing from './Landing';

export default {
  title: 'screens/Landing',
  component: Landing,
  argTypes: {

  }
}

const Template = (args) => <Landing {...args} />

export const Default = Template.bind({})
Default.args = {

}

