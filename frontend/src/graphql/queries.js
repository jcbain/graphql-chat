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
