const { MongoDataSource } = require('apollo-datasource-mongodb');

class Messages extends MongoDataSource {
    constructor(model){
        super(model);
        this.Model = model;
    }

    async getMessagesByConversationId(conversationId) {
      return await this.findByFields({ conversation: conversationId })
    }

};

module.exports = Messages;