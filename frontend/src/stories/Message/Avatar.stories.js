import React from 'react';

import Avatar from '../../components/Message/Avatar';

export default {
  title: 'Messages/Avatar',
  component: Avatar,
}

const Template = (args) => <Avatar {...args} />;

export const Yours = Template.bind({});
Yours.args = {
   initials: "JB"
};

export const Mine = Template.bind({});
Mine.args = {
   initials: "KG",
   mine: true
}