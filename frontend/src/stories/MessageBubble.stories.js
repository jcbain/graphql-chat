import React from 'react';

import MessageBubble from '../components/MessageBubble';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Messages/MessageBubble',
  component: MessageBubble,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
};

const Template = (args) => <MessageBubble {...args} />;

export const Yours = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Yours.args = {
   text: "This is some sample text"
};

export const Mine = Template.bind({});
Mine.args = {
   text: "And this is just some of my text",
   mine: true
}