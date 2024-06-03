require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Updated user structure
const userTemplate = {
  user_id: "",
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
  contributions: [],
  media: [],
  opportunities: [],
  legacy_keys: [],
  created_at: new Date(),
  updated_at: new Date()
};

// Updated event structure
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

// Updated category structure
const categoryTemplate = {
  category_id: "",
  name: ""
};

// Updated media structure
const mediaTemplate = {
  media_id: "",
  event_id: "",
  url: "",
  type: "",
  description: "",
  created_at: new Date()
};

async function connectDB() {
  if (!client.isConnected) {
    await client.connect();
  }
  return client.db("myDatabase");
}

async function insertUser(user) {
  const db = await connectDB();
  const newUser = { ...userTemplate, ...user, user_id: generateId() };
  await db.collection("Users").insertOne(newUser);
}

async function insertEvent(event) {
  const db = await connectDB();
  const newEvent = { ...eventTemplate, ...event, event_id: generateId() };
  newEvent.created_at = new Date();
  newEvent.modified_at = new Date();
  await db.collection("Events").insertOne(newEvent);
}

async function insertCategory(category) {
  const db = await connectDB();
  const newCategory = { ...categoryTemplate, ...category, category_id: generateId() };
  await db.collection("Categories").insertOne(newCategory);
}

async function insertMedia(media) {
  const db = await connectDB();
  const newMedia = { ...mediaTemplate, ...media, media_id: generateId(), created_at: new Date() };
  await db.collection("Media").insertOne(newMedia);
}

// Example ID generator
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  insertUser,
  insertEvent,
  insertCategory,
  insertMedia
};
