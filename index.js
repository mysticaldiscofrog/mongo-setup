const { insertUser, insertEvent, insertCategory, insertMedia } = require('./dbOperations');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Example usage:
    const exampleUser = {
      email: "user@example.com",
      name: "User Name",
      username: "username",
      title: "Title",
      bio: "Bio",
      city: "City",
      zipcode: "Zipcode"
    };
    await insertUser(exampleUser);

    const exampleEvent = {
      name: "Event Name",
      description: "Description",
      start_time: "2024-06-01T10:00:00",
      end_time: "2024-06-01T12:00:00",
      flags: {
        is_skill: true,
        is_interest: false,
        is_intention: false,
        is_in_person: true,
        is_beginner: true,
        is_intermediate: false,
        is_advanced: false,
        is_contribution: false
      },
      category_id: "category1"
    };
    await insertEvent(exampleEvent);

    const exampleCategory = {
      name: "Category Name"
    };
    await insertCategory(exampleCategory);

    const exampleMedia = {
      event_id: "event1",
      url: "http://example.com/media.jpg",
      type: "image",
      description: "An example image"
    };
    await insertMedia(exampleMedia);

    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
    console.log("MongoDB client closed.");
    process.exit(0);
  }
}

run().catch(console.dir);
