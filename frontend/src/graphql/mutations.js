import { gql } from '@apollo/client'

export const CREATE_USER = gql`
   mutation CreatUser($username: String!, $email: String!, $password: String!){
      createUser(userInput: {username: $username, email: $email, password: $password}) {
         email
         username
      }
   }
`;

export const CREATE_MESSAGE = gql`
   mutation CreateMessage($body: String!, $receiverId: ID!, $conversationId: ID!){
      createMessage(body: $body, receiverId: $receiverId, conversationId: $conversationId) {
         _id
        body
        conversation {
            _id
        }
        sender {
            _id
        }
      }
   }
`;
