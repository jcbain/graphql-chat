import React from 'react';
import MessageBubble from '../../components/Message/MessageBubble';


export default {
   title: 'Messages/MessageBubble',
  component: MessageBubble,
};

const Template = (args) => <MessageBubble {...args} />;

export const Yours = Template.bind({});
Yours.args = {
   text: "This is some sample text"
};

export const Mine = Template.bind({});
Mine.args = {
   text: "And this is just some of my text",
   mine: true
}