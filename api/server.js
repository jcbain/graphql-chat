const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const cookieParser = require("cookie-parser");
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
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     res.setHeader("Access-Control-Allow-Credentials", true)
//     res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
//     if(req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// })
app.use(cookieParser());
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
        context: async ({req, res}) => {
            return {
                req: req,
                res: res
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
        }],
        
    });

    await server.start();
    server.applyMiddleware({ app, cors: {
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        exposedHeaders: ["set-cookie"],
        methods: ['GET', 'POST', 'OPTIONS']
        // methods: ["POST"]
    } });

    httpServer.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
    });
})()