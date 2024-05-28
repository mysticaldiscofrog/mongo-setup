const userOperations = require('./operations/userOperations');
const eventOperations = require('./operations/eventOperations');
const categoryOperations = require('./operations/categoryOperations');
const mediaOperations = require('./operations/mediaOperations');
const connectDB = require('./connect');

async function main() {
  const db = await connectDB();
  const client = db.client; // Capture the client from the database connection

  try {
    // Example usage:

        // Hardcoded IDs for existing documents in your database
        const userId = "665534a7a74a9a18cf5d5db2"; // Replace with an actual user ID
        const eventId = "665534a7a74a9a18cf5d5db3"; // Replace with an actual event ID
        const categoryId = "665534a7a74a9a18cf5d5db4"; // Replace with an actual category ID
        const mediaId = "665534a7a74a9a18cf5d5db5"; // Replace with an actual media ID
  
    // Retrieve and log the documents by their IDs
    const user = await userOperations.getUserById(userId);
    console.log("User:", user);

    const event = await eventOperations.getEventById(eventId);
    console.log("Event:", event);

    const category = await categoryOperations.getCategoryById(categoryId);
    console.log("Category:", category);

    const media = await mediaOperations.getMediaById(mediaId);
    console.log("Media:", media);

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


  
/*
    const exampleUser = {
      email: "3user@example.com",
      name: "3User Name",
      username: "3username",
      title: "Title",
      bio: "Bio",
      city: "City",
      zipcode: "Zipcode"
    };
    const insertedUserResult = await userOperations.insertUser(exampleUser);
    const userId = insertedUserResult.insertedId.toString();

    const exampleEvent = {
      name: "Event Name 3",
      description: "Description 3",
      start_time: "4024-06-01T10:00:00",
      end_time: "4024-06-01T12:00:00",
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
    const insertedEventResult = await eventOperations.insertEvent(exampleEvent);
    const eventId = insertedEventResult.insertedId.toString();

    const exampleCategory = {
      name: "3Category Name"
    };
    const insertedCategoryResult = await categoryOperations.insertCategory(exampleCategory);
    const categoryId = insertedCategoryResult.insertedId.toString();

    const exampleMedia = {
      event_id: eventId,
      url: "http://3example.com/media.jpg",
      type: "3image",
      description: "An example image"
    };
    const insertedMediaResult = await mediaOperations.insertMedia(exampleMedia);
    const mediaId = insertedMediaResult.insertedId.toString();
*/