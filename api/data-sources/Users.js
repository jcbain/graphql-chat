const { MongoDataSource } = require('apollo-datasource-mongodb');

class Users extends MongoDataSource {
    constructor(model){
        super(model);
        this.Model = model;

    }
    async getUser(userId) {
        return await this.findOneById(userId);
    }

    async getUsers(userIds) {
        return await this.findManyByIds(userIds);
    }

    async getUserByEmail(email) {
        const foundUsers = await this.findByFields({ email: email })
        return foundUsers[0];
    }

    async getUserByUsername(username) {
        const foundUsers = await this.findByFields({ username: username });
        return foundUsers[0];
    }

};

module.exports = Users;