import React from 'react';
import Profile from './Profile';

export default {
  title: 'components/Profile',
  component: Profile,
  argTypes: {

  }
}

const Template = (args) => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {

}

