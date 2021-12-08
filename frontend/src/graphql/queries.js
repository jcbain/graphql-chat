import { gql } from '@apollo/client'

export const GET_AUTH = gql`
   query Login($username: String, $password: String){
      login(username: $username, password: $password) {
         loggedIn
         username
         email
      }
   }
`;

export const GET_MESSAGES = gql`
   query GetMessages($conversationId: ID!) {
      messages(conversationId: $conversationId) {
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
`;

// query {
   //                  messages(conversationId: "61aa52764dd2f2fa797d5f3b") {
   //                      _id
   //                      body
            
   //                  }
   //              }