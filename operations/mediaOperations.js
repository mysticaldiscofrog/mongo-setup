const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const mediaTemplate = {
  event_id: "",
  url: "",
  type: "",
  description: "",
  created_at: null
};

async function insertMedia(media) {
  const db = await connectDB();
  const newMedia = { ...mediaTemplate, ...media, _id: new ObjectId(), created_at: new Date() };
  return await db.collection("Media").insertOne(newMedia);
}

async function getMediaById(id) {
  const db = await connectDB();
  return await db.collection("Media").findOne({ _id: new ObjectId(id) });
}

async function updateMedia(id, updatedMedia) {
  const db = await connectDB();
  await db.collection("Media").updateOne({ _id: new ObjectId(id) }, { $set: updatedMedia });
}

async function deleteMedia(id) {
  const db = await connectDB();
  await db.collection("Media").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  insertMedia,
  getMediaById,
  updateMedia,
  deleteMedia
};
