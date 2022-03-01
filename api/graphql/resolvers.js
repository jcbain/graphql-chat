const { PubSub, withFilter } = require("graphql-subscriptions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const resolvers = {
    Query: {
        users: async (_,__, {dataSources: { users }, req }) => {
            return await users.Model.find();
        },
        messages: async (_, { conversationId }, { dataSources: { messages, users }, req }) => {
            if (!req.isAuth) throw new Error("you don't have access to do that");
            const foundMessages = await messages.getMessagesByConversationId(conversationId);
            const result = foundMessages.map(message => {
                return {...message._doc, 
                    sender: users.getUser(message._doc.sender), 
                    receiver:users.getUser(message._doc.receiver) }
            })
            return result;
        },
        conversations: async (_, __, {dataSources: { conversations }, req }) => {
            if (!req.isAuth) throw new Error("you don't have access to do that");
            return await conversations.Model.find();
        },
        login: async (_, {username, password}, { dataSources: { users }, req, res}) => {

            const numHours = 2;
            if(req.isAuth && (!password || !username)) {
                const userId = req.userId;
                const foundUser = await users.getUser(userId);
                return { username: foundUser._doc.username, email: foundUser._doc.email, tokenExpiration: numHours, loggedIn: true }
            }

            if (!username || !password ) throw new Error("username or email can't be blanky");
            const foundUser = await users.getUserByUsername(username);
            if (!foundUser) throw new Error("no user found with that username");
            
            const hasValidPassword = await bcrypt.compare(password, foundUser.password);
            if (!hasValidPassword) throw new Error("password doesn't match");

            const token = jwt.sign({ userId: foundUser.id, username: foundUser.username}, 'supersecretkey', {
                expiresIn: `${numHours}hr`
            });

            res.cookie('token', token, {
                secure: false,
                httpOnly: true
            });

            console.log('here')

            return { username: foundUser._doc.username, email: foundUser._doc.email, tokenExpiration: numHours, loggedIn: true}
        },
        checkAuth: async (_, __, { dataSources: { users }, req}) => {
            if (!req.userId){
                throw new Error("user is not logged in");
            }
            const foundUser = await users.getUser(req.userId);

            if (!foundUser) {
                throw new Error("you are not logged in");
            }
            
            return {username: foundUser._doc.username, email: foundUser._doc.email, tokenExpiration: 2, loggedIn: true}

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
        createMessage: async (_, {body, receiverId, conversationId}, { dataSources: { messages, conversations, users }, req }) => {
            if (!req.isAuth) throw new Error("you don't have access to do that");

            if (!body || !receiverId || !conversationId ) throw new Error("all message fields are required");

            const newMessage = new messages.Model({
                body,
                sender: req.userId,
                receiver: receiverId,
                conversation: conversationId
            });

            try {
                const result = await newMessage.save();
                const conversation = await conversations.getConversationById(conversationId);
                conversation.messages.push(newMessage);
                await conversation.save();
                const returnResult = {...result._doc, conversation: conversation._doc, sender: await users.getUser(result._doc.sender), receiver: await users.getUser(result._doc.receiver)}
                pubsub.publish("NEW_MESSAGE", {newMessage: returnResult});
                return returnResult;

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
                    return (payload.newMessage.conversation._id.toString() === vars.conversationId ) || {};
                }
            )
        }
    },
};

module.exports = resolvers;