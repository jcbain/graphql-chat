const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub, withFilter } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const messages = [];
const users = [
    {_id: '1', username: 'jcbain', email: 'j@j.com', password: '123'},
    {_id: '2', username: 'dscully', email: 's@s.com', password: '123'},
    {_id: '3', username: 'fmulder', email: 'm@m.com', password: '123'}
];
const conversations = [];

(async () => {
    const PORT = 8090;
    const pubsub = new PubSub();
    const app = express();
    const httpServer = createServer(app);

    const typeDefs = gql`
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
            messages: [Message!]!
            users: [User]!
        }

        type Query {
            messages: [Message!]!
            conversations: [Conversation!]!
            login(username: String!, password: String!): User!
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

    const resolvers = {
        Query: {
            users: () => users,
            messages: () => messages,
            conversations: () => conversations,
            login: (_, {username, password}) => {
                const foundUser = users.find(user => user.username === username);
                if (!foundUser) throw new Error("no user found with that email");
                if (!foundUser.password === password) throw new Error("incorrect password");
                return { ...foundUser, password: null };
            }
        },
        Mutation: {
            createUser: (_, {userInput}) => {
                    const {username, email, password} = userInput;
                    const id = Math.floor(Math.random() * 2000) + 1;
                    const newUser = {_id: String(id), username, email, password };
                    users.push(newUser);
                    return {...newUser, password: null};
            },
            createConversation: (_, { topic, users }) => {
                const id = Math.floor(Math.random() * 2000) + 1;
                const newConversation = {_id: String(id), topic: topic, messages: messages, users: users};
                conversations.push(newConversation)
                return newConversation;
            },
            createMessage: (_, {body, receiverId, conversationId}) => {
                const foundConversation = conversations.find(convo => {
                    return convo._id == conversationId
                });
                if (!foundConversation) throw new Error("Conversation doesn't exist");
                const id = Math.floor(Math.random() * 2000) + 1;
                const newMessage = { _id: String(id), body: body, sender: 1, receiver: receiverId, conversation: foundConversation._id}
                messages.push(newMessage);
                pubsub.publish("NEW_MESSAGE", { newMessage:  newMessage});
                return newMessage

            }
            
            // createNum: (_, {num}) => {
            //     numbers.push({value: num})
            //     pubsub.publish("NEW_NUMBERS", { newNumbers:  numbers});
            //     return { value: num };
            // }
        },
        Subscription: {
            // newMessage: {
            //     subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"])
            // }
            newMessage: {
                subscribe: withFilter(
                    () => pubsub.asyncIterator(["NEW_MESSAGE"]),
                    (payload, vars) => {
                        console.log(payload)
                        console.log(vars)
                        return (payload.newMessage.conversation === vars.conversationId );
                    }
                )
            }


            // newNumbers: {
            //     subscribe: () => pubsub.asyncIterator(["NEW_NUMBERS"]),
            // },
        },
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
        schema,
    });
    await server.start();
    server.applyMiddleware({ app });

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    );

    httpServer.listen(PORT, () => {
        console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        );
    });


})()