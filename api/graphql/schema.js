const { gql } = require("apollo-server-express");

module.exports =  gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Message {
        _id: ID!
        body: String!
        sender: User!
        receiver: User!
        conversation: Conversation!
    }

    type Conversation {
        _id: ID!
        topic: String!
        messages: [Message]!
        users: [User!]!
    }

    type AuthData {
        username: String!
        email: String!
        tokenExpiration: Int!
    }

    type Query {
        messages(conversationId: ID!): [Message!]!
        conversations: [Conversation!]!
        login(username: String!, password: String!): AuthData!
        users: [User!]!
    }

    type Mutation {
        createConversation(topic: String!, users: [ID!]): Conversation!
        createMessage(body: String!, receiverId: ID!, conversationId: ID!): Message!
        createUser(userInput: UserInput): User!
    }

    type Subscription {
        newMessage(conversationId: ID!): Message!
    }    
`;