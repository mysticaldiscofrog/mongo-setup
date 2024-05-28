const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const eventTemplate = {
  name: "",
  description: "",
  start_time: null,
  end_time: null,
  flags: {
    is_skill: null,
    is_interest: null,
    is_intention: null,
    is_in_person: null,
    is_beginner: null,
    is_intermediate: null,
    is_advanced: null,
    is_contribution: null
  },
  category_id: "",
  created_at: null,
  updated_at: null
};

async function insertEvent(event) {
  const db = await connectDB();
  const newEvent = { ...eventTemplate, ...event, _id: new ObjectId() };
  newEvent.created_at = new Date();
  newEvent.updated_at = new Date();
  newEvent.start_time = new Date(event.start_time);
  newEvent.end_time = new Date(event.end_time);
  return await db.collection("Events").insertOne(newEvent);
}

async function getEventById(id) {
  const db = await connectDB();
  return await db.collection("Events").findOne({ _id: new ObjectId(id) });
}

async function updateEvent(id, updatedEvent) {
  const db = await connectDB();
  updatedEvent.updated_at = new Date();
  await db.collection("Events").updateOne({ _id: new ObjectId(id) }, { $set: updatedEvent });
}

async function deleteEvent(id) {
  const db = await connectDB();
  await db.collection("Events").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  insertEvent,
  getEventById,
  updateEvent,
  deleteEvent
};
