const { PubSub, withFilter } = require("graphql-subscriptions");
const bcrypt = require("bcryptjs");

const pubsub = new PubSub();

const messages = [];
const users = [
    {_id: '1', username: 'jcbain', email: 'j@j.com', password: '123'},
    {_id: '2', username: 'dscully', email: 's@s.com', password: '123'},
    {_id: '3', username: 'fmulder', email: 'm@m.com', password: '123'}
];
const conversations = [];

const getUser = (userId) => {
    try {
        const user = users.find(user => user._id === userId);
        if (!user) throw new Error("no user found");
        return {...user, password: null}
    } catch (err) {
        throw err
    }
};

const getUsers = (userIds) => {
    try {
        const foundUsers = userIds.map(id => users.find(user => user._id === id));
        return foundUsers;
    } catch (err) {
        throw err;
    }
};

const getMessages = (messageIds) => {
    try {
        // const foundMessages = messageIds.map(id => messages.find(message => message._id === id));
        // console.log("foundMessages", foundMessages)
        return [messages[0]]
    } catch (err) {
        throw "this went poorly";
    }
}

const getConversation = (conversationId) => {
    try {
        const foundConversation = conversations.find(conversation => conversation._id === conversationId);
        const formattedConvo = {...foundConversation }
        return formattedConvo;
    } catch (err) {
        throw err;
    }
}

const resolvers = {
    Query: {
        users: async (_,__, {dataSources: { users }}) => {
            return await users.Model.find();
        },
        messages: async (_, { conversationId }, { dataSources: { messages } }) => {
            const result = await messages.getMessagesByConversationId(conversationId)
            console.log(result);
            return result;
        },
        conversations: () => conversations,
        login: (_, {username, password}) => {
            const foundUser = users.find(user => user.username === username);
            if (!foundUser) throw new Error("no user found with that email");
            if (!foundUser.password === password) throw new Error("incorrect password");
            return { ...foundUser, password: null };
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
        // newMessage: {
        //     subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"])
        // }
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(["NEW_MESSAGE"]),
                (payload, vars) => {
                    return (payload.newMessage.conversation.toString() === vars.conversationId );
                }
            )
        }
    },
};

module.exports = resolvers;