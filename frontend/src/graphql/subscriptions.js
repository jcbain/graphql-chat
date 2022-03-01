import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
   subscription OnMessageAdded($conversationId: ID!) {
      newMessage(conversationId: $conversationId) {
         _id
         body
         sender {
            _id
            username
         }
         receiver {
            _id
            username
         }
    }
  }
`
