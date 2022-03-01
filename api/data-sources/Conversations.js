const { MongoDataSource } = require('apollo-datasource-mongodb');

class Conversations extends MongoDataSource {
    constructor(model){
        super(model);
        this.Model = model;
    }

    async getConversationById(conversationId){
        return await this.findOneById(conversationId);
    }

};

module.exports = Conversations;