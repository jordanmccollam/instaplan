import React from 'react';
import Button from './Button';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {

  }
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const Medium = Template.bind({})
Medium.args = {
  size: 'md',
  children: "LOGIN"
}
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: "LOGIN"
}

