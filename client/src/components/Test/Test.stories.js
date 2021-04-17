import React from 'react';
import Test from './Test';

export default {
  title: 'components/Test',
  component: Test,
  argTypes: {

  }
}

const Template = (args) => <Test {...args} />

export const Default = Template.bind({})
Default.args = {

}

