const mongoose = require("mongoose");


const conversationSchema = new mongoose.Schema({
    topic: {
        type: String,
        require: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Conversation', conversationSchema);