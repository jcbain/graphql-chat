const { MongoDataSource } = require('apollo-datasource-mongodb');

class Messages extends MongoDataSource {
    constructor(model){
        super(model);
        this.Model = model;
    }

    async getMessagesByConversationId(conversationId) {
      return await this.findByFields({ conversation: conversationId })
    }

    // getUser(userId) {
    //     return this.findOneById(userId);
    // }

    // async getUserByEmail(email) {
    //     const foundUsers = await this.findByFields({ email: email })
    //     return foundUsers[0];
    // }

    // async getUserByUsername(username) {
    //     const foundUsers = await this.findByFields({ username: username });
    //     return foundUsers[0];
    // }

};

module.exports = Messages;