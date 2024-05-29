### Technical Summary and Implementation

#### Objective
We aim to design a data structure that allows for:
1. Defining root events for skills, interests, and intentions.
2. Dynamically referencing these root events.
3. Handling large user and event documents by archiving and creating new documents with references to previous ones.

#### Key Components
1. **Event Schema**: To define events, including root events and regular events.
2. **User Schema**: To manage user data, including opportunities and references to legacy documents.
3. **Root Event Mapping Schema**: To map topics to their root events for quick access.
4. **Archiving Mechanism**: To handle large documents by creating new documents and referencing the old ones.

### Schemas

#### Event Schema

//javascript
const eventTemplate = {
  event_id: "", // Unique identifier for the event
  name: "", // Name of the event
  description: "", // Description of the event
  start_time: null, // Start time of the event
  end_time: null, // End time of the event
  flags: {
    is_skill: null, // Boolean indicating if the event is skill-based
    is_interest: null, // Boolean indicating if the event is interest-based
    is_intention: null, // Boolean indicating if the event is intention-based
    is_in_person: null, // Boolean indicating if the event is in-person
    is_beginner: null, // Boolean indicating if the event is for beginners
    is_intermediate: null, // Boolean indicating if the event is for intermediates
    is_advanced: null, // Boolean indicating if the event is for advanced users
    is_contribution: null // Boolean indicating if the event involves contributions
  },
  category_id: "", // Category identifier for the event
  created_at: new Date(), // Creation timestamp
  updated_at: new Date(), // Last updated timestamp
  user_references: [], // Array of user IDs associated with this event
  required_skills: [], // Array of required skills with locality info
  root_event: false, // Indicates if this is the root event for a skill, interest, or intention
  root_reference: null, // Reference to the root event ID if this is not a root event
  legacy_key: null // Reference to the previous event document if this is a continuation
};


#### User Schema

//javascript
const userTemplate = {
  user_id: "", // Unique identifier for the user
  email: "", // User's email
  name: "", // User's name
  username: "", // User's username
  title: "", // User's title
  bio: "", // User's bio
  city: "", // User's city
  zipcode: "", // User's zipcode
  location: {
    latitude: 0.0, // User's latitude
    longitude: 0.0 // User's longitude
  },
  skills: [], // Array of user's skills
  interests: [], // Array of user's interests (e.g., topic IDs)
  intentions: [], // Array of user's intentions
  contributions: [], // Array of user's contributions
  media: [], // Array of media IDs (e.g., profile photos)
  opportunities: [], // Array to track event IDs or opportunities
  legacy_keys: [], // Array of IDs referencing legacy documents
  created_at: new Date(), // Creation timestamp
  updated_at: new Date() // Last updated timestamp
};


#### Root Event Mapping Schema

///javascript
const rootEventMappingTemplate = {
  topic_id: "", // Unique identifier for the topic
  name: "", // Name of the topic
  root_event_id: "" // ID of the root event for this topic
};


### Implementation

#### Creating a Root Event and Mapping It

1. **Root Event Creation**:
   - When a user creates an event for a new skill, interest, or intention, the system generates a root event and maps it.
   - The user-created event is then referenced by the root event.

2. **Root Event Mapping**:
   - Map the topic to the root event for quick reference.

//javascript
const carpentryRootEvent = {
  event_id: "event_id_carpentry_root",
  name: "Root Event for Carpentry",
  description: "The root event defining the skill of carpentry.",
  start_time: new Date(),
  end_time: new Date(),
  flags: {
    is_skill: true,
    is_interest: null,
    is_intention: null,
    is_in_person: true,
    is_beginner: true,
    is_intermediate: true,
    is_advanced: true,
    is_contribution: null
  },
  category_id: "craftsmanship",
  created_at: new Date(),
  updated_at: new Date(),
  user_references: [],
  required_skills: [],
  root_event: true, // This is the root event for Carpentry
  root_reference: null, // No reference as it is the root
  legacy_key: null
};

const rootEventMapping = {
  topic_id: "topic_id_carpentry",
  name: "Carpentry",
  root_event_id: "event_id_carpentry_root"
};

async function createRootEventAndMapping() {
  await client.connect();
  const database = client.db('your_database_name');
  const events = database.collection('events');
  const mappings = database.collection('root_event_mappings');

  await events.insertOne(carpentryRootEvent);
  await mappings.insertOne(rootEventMapping);

  await client.close();
}

createRootEventAndMapping().catch(console.error);


#### Creating a User Event and Referencing Root Event

1. **User Event Creation**:
   - Users create events that reference the root event.

//javascript
const advancedCarpentryEvent = {
  event_id: "event_id_advanced_carpentry",
  name: "Advanced Carpentry Techniques",
  description: "An event focused on advanced carpentry skills.",
  start_time: new Date(),
  end_time: new Date(),
  flags: {
    is_skill: true,
    is_interest: null,
    is_intention: null,
    is_in_person: true,
    is_beginner: null,
    is_intermediate: true,
    is_advanced: true,
    is_contribution: null
  },
  category_id: "craftsmanship",
  created_at: new Date(),
  updated_at: new Date(),
  user_references: ["user_id_3", "user_id_4"],
  required_skills: [
    { skill: "Carpentry", is_local: true },
    { skill: "Finishing", is_local: false }
  ],
  root_event: false, // Not a root event
  root_reference: "event_id_carpentry_root", // Reference to the root event for Carpentry
  legacy_key: null
};

async function createUserEvent() {
  await client.connect();
  const database = client.db('your_database_name');
  const events = database.collection('events');

  await events.insertOne(advancedCarpentryEvent);

  await client.close();
}

createUserEvent().catch(console.error);


#### Archiving User Documents

1. **Archiving Large User Documents**:
   - When a user document becomes too large, archive it and create a new document with a reference to the archived document.

//javascript
const newUser = {
  user_id: "user_id_2",
  email: "newuser@example.com",
  name: "Jane Doe",
  username: "jane_doe",
  title: "Senior Carpenter",
  bio: "Experienced carpenter with a focus on custom furniture.",
  city: "New York",
  zipcode: "10001",
  location: {
    latitude: 40.7128,
    longitude: -74.0060
  },
  skills: ["Carpentry", "Furniture Making"],
  interests: ["topic_id_carpentry"],
  intentions: ["Improve woodworking skills"],
  contributions: ["Community Workshops"],
  media: ["media_id_3"],
  opportunities: ["event_id_advanced_carpentry"],
  legacy_keys: ["user_id_1"], // Reference to the previous document
  created_at: new Date(),
  updated_at: new Date()
};

async function archiveUserAndCreateNew() {
  await client.connect();
  const database = client.db('your_database_name');
  const users = database.collection('users');

  await users.insertOne(newUser);

  await client.close();
}

archiveUserAndCreateNew().catch(console.error);


### Summary

- **Event Schema**: Defines events with fields for root event identification and legacy references.
- **User Schema**: Manages user data with opportunities and legacy references.
- **Root Event Mapping Schema**: Maps topics to root events for quick reference.
- **Archiving Mechanism**: Handles large documents by creating new documents and referencing old ones.

This design ensures a scalable and efficient system for managing events and user data, with clear references for root events and handling of large documents.
