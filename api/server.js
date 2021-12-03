const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const isAuth = require("./middleware/is-auth");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const Users = require('./data-sources/Users');
const UserModel = require('./models/user');

const Conversations = require('./data-sources/Conversations');
const ConversationModel = require('./models/conversation');

const Messages = require('./data-sources/Messages');
const MessageModel = require('./models/message');

const mongoose = require("mongoose");
const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pzxhg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const PORT = 8090;
const app = express();

app.use(isAuth);
const httpServer = createServer(app);

(async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("🔌 connected to db");
    }
    catch (err) {
        throw err;
    }

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: '/graphql' }
    );

    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            users: new Users(UserModel),
            conversations: new Conversations(ConversationModel),
            messages: new Messages(MessageModel)
        }),
        context: async ({req}) => {
            return {
                req: req
            }
        },
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close()
                    }
                }
            }
        }] 
    });

    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
    });
})()