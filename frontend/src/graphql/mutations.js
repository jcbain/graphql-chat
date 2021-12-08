import { gql } from '@apollo/client'

export const CREATE_USER = gql`
   mutation CreatUser($username: String!, $email: String!, $password: String!){
      createUser(userInput: {username: $username, email: $email, password: $password}) {
         email
         username
      }
   }
`;
