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
export const Danger = Template.bind({})
Danger.args = {
  size: 'md',
  children: "LOGIN",
  kind: 'danger'
}
export const Success = Template.bind({})
Success.args = {
  size: 'md',
  children: "LOGIN",
  kind: 'success'
}
export const Primary = Template.bind({})
Primary.args = {
  size: 'md',
  children: "LOGIN",
  kind: 'primary'
}
export const Dark = Template.bind({})
Dark.args = {
  size: 'md',
  children: "LOGIN",
  kind: 'dark'
}

