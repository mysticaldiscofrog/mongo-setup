const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const userTemplate = {
  email: "",
  name: "",
  username: "",
  title: "",
  bio: "",
  city: "",
  zipcode: "",
  location: {
    latitude: 0.0,
    longitude: 0.0
  },
  skills: [],
  interests: [],
  intentions: [],
  contributions: []
};

async function insertUser(user) {
  const db = await connectDB();
  const newUser = { ...userTemplate, ...user, _id: new ObjectId() };
  return await db.collection("Users").insertOne(newUser);
}

async function getUserById(id) {
  const db = await connectDB();
  return await db.collection("Users").findOne({ _id: new ObjectId(id) });
}

async function updateUser(id, updatedUser) {
  const db = await connectDB();
  await db.collection("Users").updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });
}

async function deleteUser(id) {
  const db = await connectDB();
  await db.collection("Users").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  insertUser,
  getUserById,
  updateUser,
  deleteUser
};
