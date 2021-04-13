import React from 'react';
import Item from './Item';

export default {
  title: 'components/Item',
  component: Item,
  argTypes: {

  }
}

const Template = (args) => <Item {...args} />

export const Default = Template.bind({})
Default.args = {

}

