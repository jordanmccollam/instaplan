import React from 'react';
import Hero from './Hero';

export default {
  title: 'components/Hero',
  component: Hero,
  argTypes: {

  }
}

const Template = (args) => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const Primary = Template.bind({})
Primary.args = {
  kind: 'primary'
}
export const Success = Template.bind({})
Success.args = {
  kind: 'success'
}
export const Danger = Template.bind({})
Danger.args = {
  kind: 'danger'
}

