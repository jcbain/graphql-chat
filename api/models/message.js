const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }
});

module.exports = mongoose.model('Message', messageSchema);