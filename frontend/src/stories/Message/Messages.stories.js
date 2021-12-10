import React from 'react';
import Messages from "../../components/Messages";

const messagesData = [
   {_id: 1, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 2, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 3, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"},
   {_id: 4, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 5, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"},
   {_id: 6, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"},
]

const extendedMessageData = [
   ...messagesData,
   {_id: 7, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 8, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 9, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"},
   {_id: 10, sender: {_id: 1, username: "jcbain"}, body: "This is the start of something good"},
   {_id: 11, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"},
   {_id: 12, sender: {_id: 2, username: "scully"}, body: "This is the start of something good"}
]

export default {
   title: 'Messages/Messages',
  component: Messages,
};

const Template = (args) => <Messages {...args} />;

export const Default = Template.bind({});
Default.args = {
   data: messagesData,
   userId: 1,
};

export const Extended = Template.bind({});
Extended.args = {
   data: extendedMessageData,
   userId: 1,
};

