const { PubSub, withFilter } = require("graphql-subscriptions");

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
        createConversation:  (_, { topic, users }) => {
            const id = Math.floor(Math.random() * 2000) + 1;
            const newConversation = {_id: String(id), topic: topic, messages: [], users: getUsers.bind(this, users)};
            conversations.push(newConversation)
            return newConversation;
        },
        createMessage: (_, {body, receiverId, conversationId}) => {
            const foundConversation = conversations.find(convo => {
                return convo._id == conversationId
            });
            if (!foundConversation) throw new Error("Conversation doesn't exist");
            const id = Math.floor(Math.random() * 2000) + 1;
            const newMessage = { _id: String(id), body: body, sender: 1, receiver: getUser.bind(this, receiverId), conversation: getConversation.bind(this, foundConversation._id)};
            foundConversation.messages.push(newMessage._id);
            console.log('foundConvo', foundConversation)
            console.log(newMessage)
            messages.push(newMessage);
            pubsub.publish("NEW_MESSAGE", { newMessage:  newMessage});
            return newMessage

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
                    console.log(payload)
                    console.log(vars)
                    return (payload.newMessage.conversation === vars.conversationId );
                }
            )
        }
    },
};

module.exports = resolvers;