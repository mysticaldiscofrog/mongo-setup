const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const eventTemplate = {
  event_id: "",
  topic_id: "",
  name: "",
  description: "",
  end_time: new Date(),
  flags: {
    is_skill: false,
    is_interest: false,
    is_intention: false,
    is_in_person: false,
    is_beginner: false,
    is_intermediate: false,
    is_advanced: false,
    is_contribution: false
  },
  created_at: new Date(),
  user_references: [],
  required_skills: [],
  root_event: false,
  root_reference: null,
  legacy_key: null,
  modified_by: "",
  modified_at: new Date(),
  change_description: "",
  attendees: [],
  participation_status: [],
  categories: [],
  feedback: [],
  external_ids: [],
  languages_supported: [],
  location_specifics: {
    country: "",
    region: "",
    city: "",
    latitude: 0.0,
    longitude: 0.0
  },
  sustainability_focus: [],
  partner_organizations: [],
  collaboration_level: "",
  tech_requirements: [],
  tools_provided: [],
  governance_model: "",
  funding_source: "",
  roles: [],
  permissions: [],
  preferred_language: ""
};

async function insertEvent(event) {
  const db = await connectDB();
  const newEvent = { ...eventTemplate, ...event, _id: new ObjectId() };
  return await db.collection("Events").insertOne(newEvent);
}

async function getEventById(id) {
  const db = await connectDB();
  return await db.collection("Events").findOne({ _id: new ObjectId(id) });
}

async function updateEvent(id, updatedEvent) {
  const db = await connectDB();
  updatedEvent.modified_at = new Date();
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
