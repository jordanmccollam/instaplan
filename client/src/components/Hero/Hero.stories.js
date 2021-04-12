import React from 'react';
import Hero from './Hero';

export default {
  title: 'components/Hero',
  component: Hero,
  argTypes: {

  }
}

const Template = (args) => <Hero {...args} />

export const Primary = Template.bind({})
Primary.args = {

}
export const Success = Template.bind({})
Success.args = {
  kind: 'success'
}

