import React from 'react';

import Message from '../../components/Message';

export default {
   title: 'Messages/Message',
  component: Message,
};

const Template = (args) => <Message {...args} />;

export const Yours = Template.bind({});
Yours.args = {
   text: "This is some sample text",
   showAvatar: true,
   initials: "DS"
};

export const Mine = Template.bind({});
Mine.args = {
   text: "And this is just some of my text",
   mine: true,
   showAvatar: true,
   initials: "JB"
}

const TemplateDoubles = (args) => <><Message {...args.one}/><Message {...args.two}/></>;

export const Multi = TemplateDoubles.bind({});
Multi.args = {
   one: {
      text: "what if I just started writing out some super long message about nothing at all",
      mine: false,
      showAvatar: false,
      initials: "JB"
   },
   two: {
      text: "And this is just some of my text",
      mine: false,
      showAvatar: true,
      initials: "JB"
   }
}

export const MultiMine = TemplateDoubles.bind({});
MultiMine.args = {
   one: {
      text: "And this is just some of my text",
      mine: true,
      showAvatar: false,
      initials: "DS"
   },
   two: {
      text: "just a bit of text to see what this will look like when it is longer",
      mine: true,
      showAvatar: true,
      initials: "DS"
   }
}

