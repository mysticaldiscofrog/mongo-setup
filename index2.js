const fs = require('fs');
const userOperations = require('./operations/userOperations');
const eventOperations = require('./operations/eventOperations');
const categoryOperations = require('./operations/categoryOperations');
const mediaOperations = require('./operations/mediaOperations');
const connectDB = require('./connect');
const { users, events, categories, media } = require('./testData');
const { ObjectId } = require('mongodb');

async function retrieveDocumentById(collection, id) {
  const db = await connectDB();
  return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function main() {
  const db = await connectDB();
  const client = db.client; // Capture the client from the database connection

  try {
    // Insert users
    const insertedUsers = [];
    for (const user of users) {
      const insertedUserResult = await userOperations.insertUser(user);
      const userId = insertedUserResult.insertedId.toString();
      insertedUsers.push(userId);
      console.log("Inserted User ID:", userId);
    }

    // Insert events
    const insertedEvents = [];
    for (const event of events) {
      event.user_references = [insertedUsers[0]]; // Example: associate first user with the event
      event.modified_by = insertedUsers[0]; // Example: modified by first user
      event.attendees = [insertedUsers[0]]; // Example: first user attends the event
      event.participation_status = [{ user_id: insertedUsers[0], status: "confirmed" }];
      const insertedEventResult = await eventOperations.insertEvent(event);
      const eventId = insertedEventResult.insertedId.toString();
      insertedEvents.push(eventId);
      console.log("Inserted Event ID:", eventId);
    }

    // Insert categories
    const insertedCategories = [];
    for (const category of categories) {
      const insertedCategoryResult = await categoryOperations.insertCategory(category);
      const categoryId = insertedCategoryResult.insertedId.toString();
      insertedCategories.push(categoryId);
      console.log("Inserted Category ID:", categoryId);
    }

    // Insert media
    const insertedMedia = [];
    for (const mediaItem of media) {
      mediaItem.event_id = events[0].event_id; // Example: associate first event with the media
      const insertedMediaResult = await mediaOperations.insertMedia(mediaItem);
      const mediaId = insertedMediaResult.insertedId.toString();
      insertedMedia.push(mediaId);
      console.log("Inserted Media ID:", mediaId);
    }

    // Retrieve and log full documents
    console.log("Retrieving full documents...");

    const outputData = {
      users: [],
      events: [],
      categories: [],
      media: []
    };

    console.log("Users:");
    for (const userId of insertedUsers) {
      const userDocument = await retrieveDocumentById('Users', userId);
      outputData.users.push(userDocument);
      console.log(userDocument);
    }

    console.log("Events:");
    for (const eventId of insertedEvents) {
      const eventDocument = await retrieveDocumentById('Events', eventId);
      outputData.events.push(eventDocument);
      console.log(eventDocument);
    }

    console.log("Categories:");
    for (const categoryId of insertedCategories) {
      const categoryDocument = await retrieveDocumentById('Categories', categoryId);
      outputData.categories.push(categoryDocument);
      console.log(categoryDocument);
    }

    console.log("Media:");
    for (const mediaId of insertedMedia) {
      const mediaDocument = await retrieveDocumentById('Media', mediaId);
      outputData.media.push(mediaDocument);
      console.log(mediaDocument);
    }

    // Save output data to data.json
    fs.writeFileSync('data.json', JSON.stringify(outputData, null, 2), 'utf-8');
    console.log("Data saved to data.json");

    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
    console.log("MongoDB client closed.");
    process.exit(0);
  }
}

main().catch(console.dir);
