const { PubSub, withFilter } = require("graphql-subscriptions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const resolvers = {
    Query: {
        users: async (_,__, {dataSources: { users }, req }) => {
            console.log(req.isAuth)
            return await users.Model.find();
        },
        messages: async (_, { conversationId }, { dataSources: { messages }, req }) => {
            if (!req.isAuth) throw new Error("you don't have access to do that");
            const result = await messages.getMessagesByConversationId(conversationId)
            return result;
        },
        conversations: async (_, __, {dataSources: { conversations }, req }) => {
            if (!req.isAuth) throw new Error("you don't have access to do that");
            return await conversations.Model.find();
        },
        login: async (_, {username, password}, { dataSources: { users }, res}) => {
            const numHours = 2;
            if (!username || !password ) throw new Error("username or email can't be blank");
            const foundUser = await users.getUserByUsername(username);
            if (!foundUser) throw new Error("no user found with that username");
            
            const hasValidPassword = await bcrypt.compare(password, foundUser.password);
            if (!hasValidPassword) throw new Error("password doesn't match");

            const token = jwt.sign({ userId: foundUser.id, username: foundUser.username}, 'supersecretkey', {
                expiresIn: `${numHours}hr`
            });


            res.cookie('something', token);
            console.log('res', res)
            return { userId: foundUser.id, token: token, tokenExpiration: numHours}

        }
    },
    Mutation: {
        createUser: async (_, {userInput}, {dataSources: { users }}) => {
            const {username, email, password} = userInput;
            if (!username || !email || !password) throw new Error("username, email and password must not be empty");

            const foundUser = await users.getUserByEmail(email) || await users.getUserByUsername(username);

            if (foundUser) throw new Error("user with that email or username already exists");

            const hash = await bcrypt.hash(password, 10);

            const newUser = new users.Model({
                username,
                email,
                password: hash
            });

            try {
                const result = await newUser.save();
                return { ...result._doc, password: null };
            } catch (err) {
                throw err;
            }
        },
        createConversation: async (_, { topic, users }, { dataSources }) => {

            const newConvo = new dataSources.conversations.Model({
                topic,
                users: await dataSources.users.getUsers(users),
                messages: []
            });

            try {
                const result = await newConvo.save();
                return {...result._doc }
            } catch (err) {
                throw err;
            }
        },
        createMessage: async (_, {body, receiverId, conversationId}, { dataSources: { messages, conversations, users } }) => {

            if (!body || !receiverId || !conversationId ) throw new Error("all message fields are required");

            const newMessage = new messages.Model({
                body,
                sender: "61a9c543e5d91654d245998c",
                receiver: receiverId,
                conversation: conversationId
            });

            try {
                const result = await newMessage.save();
                const conversation = await conversations.getConversationById(conversationId);
                conversation.messages.push(newMessage);
                await conversation.save();
                pubsub.publish("NEW_MESSAGE", { newMessage:  newMessage});
                return {...result._doc, conversation: conversation, sender: await users.getUser(result._doc.sender), receiver: await users.getUser(result._doc.receiver)}

            } catch (err) {
                throw err;
            }

        }
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(["NEW_MESSAGE"]),
                (payload, vars, context ) => {
                    return (payload.newMessage.conversation.toString() === vars.conversationId );
                }
            )
        }
    },
};

module.exports = resolvers;