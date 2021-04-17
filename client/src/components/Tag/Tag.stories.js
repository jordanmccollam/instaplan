import React from 'react';
import Tag from './Tag';

export default {
  title: 'components/Tag',
  component: Tag,
  argTypes: {

  }
}

const Template = (args) => <Tag {...args} />

export const Primary = Template.bind({})
Primary.args = {

}
export const Danger = Template.bind({})
Danger.args = {
  kind: 'danger'
}
export const Success = Template.bind({})
Success.args = {
  kind: 'success'
}

