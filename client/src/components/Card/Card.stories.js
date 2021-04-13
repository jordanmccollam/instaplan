import React from 'react';
import Card from './Card';

export default {
  title: 'components/Card',
  component: Card,
  argTypes: {

  }
}

const Template = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const Primary = Template.bind({})
Primary.args = {
  kind: "primary"
}
export const Danger = Template.bind({})
Danger.args = {
  kind: "danger"
}
export const Success = Template.bind({})
Success.args = {
  kind: "success"
}
export const Ghost = Template.bind({})
Ghost.args = {
  kind: "ghost"
}
export const Light = Template.bind({})
Light.args = {
  kind: "light"
}

