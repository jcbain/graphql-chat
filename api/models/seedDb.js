const User = require("./user");
const Conversation = require("./conversation");
const Message = require("./message");
const userSeeds = require("./seeds/user.json");
const messageSeeds = require("./seeds/message.json");
const conversationSeeds = require("./seeds/conversation.json");
const mongoose = require("mongoose");


const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pzxhg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const seedModel = async (Model, data) => {
  await Model.deleteMany({});
  await Model.insertMany(data);
};

(async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("🔌 connected to db");
    await seedModel(User, userSeeds);
    await seedModel(Conversation, conversationSeeds);
    await seedModel(Message, messageSeeds);
    mongoose.connection.close();
  }
  catch (err) {
      throw err;
  }
  
})();
