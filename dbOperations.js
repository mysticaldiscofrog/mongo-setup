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

// Placeholder for user structure
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
  contributions: []
};

// Placeholder for event structure
const eventTemplate = {
  event_id: "",
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

// Placeholder for category structure
const categoryTemplate = {
  category_id: "",
  name: ""
};

// Placeholder for media structure
const mediaTemplate = {
  media_id: "",
  event_id: "",
  url: "",
  type: "",
  description: "",
  created_at: null
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
  newEvent.updated_at = new Date();
  newEvent.start_time = new Date(event.start_time);
  newEvent.end_time = new Date(event.end_time);
  await db.collection("Events").insertOne(newEvent);
}

async function insertCategory(category) {
  const db = await connectDB();
  const newCategory = { ...categoryTemplate, ...category, category_id: generateId() };
  await db.collection("MainCategories").insertOne(newCategory);
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
