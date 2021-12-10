import React from 'react';
import TextForm from '../../components/Messages/TextForm';


export default {
   title: 'Messages/TextForm',
  component: TextForm,
};

const Template = (args) => <TextForm {...args} />;


export const Default = Template.bind({});
Default.args = {
   text: "And this is just some of my text",
   mine: true
}