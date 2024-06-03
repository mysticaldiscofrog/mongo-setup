const connectDB = require('../connect');

async function getUsers() {
    const db = await connectDB();
    const collection = db.collection('Users');
    const users = await collection.find().toArray();
    return users;
}

module.exports = getUsers;
