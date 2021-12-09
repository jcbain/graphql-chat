import React from 'react';

import Avatar from '../components/MessageBubble/Avatar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Messages/Avatar',
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
};

const Template = (args) => <Avatar {...args} />;

export const Yours = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Yours.args = {
   initials: "JB"
};

export const Mine = Template.bind({});
Mine.args = {
   initials: "KG",
   mine: true
}