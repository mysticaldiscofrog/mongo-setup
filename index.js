const userOperations = require('./operations/userOperations');
const eventOperations = require('./operations/eventOperations');
const categoryOperations = require('./operations/categoryOperations');
const mediaOperations = require('./operations/mediaOperations');
const connectDB = require('./connect');

async function main() {
  const db = await connectDB();
  const client = db.client; // Capture the client from the database connection

  try {
    // Insert a new user
    const exampleUser = {
      email: "user@example.com",
      name: "User Name",
      username: "username",
      title: "Title",
      bio: "Bio",
      city: "City",
      zipcode: "12345",
      location: {
        latitude: 34.0522,
        longitude: -118.2437
      },
      skills: ["JavaScript", "Node.js"],
      interests: ["coding", "hiking"],
      intentions: ["learn more about AI", "travel more"],
      contributions: ["open source projects"],
      media: ["media1", "media2"],
      opportunities: ["opportunity1", "opportunity2"],
      legacy_keys: ["legacy1", "legacy2"]
    };
    const insertedUserResult = await userOperations.insertUser(exampleUser);
    const userId = insertedUserResult.insertedId.toString();
    console.log("Inserted User ID:", userId);

    // Insert a new event
    const exampleEvent = {
      topic_id: "exampleTopicId",
      name: "Event Name",
      description: "Event Description",
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
      user_references: [userId],
      required_skills: ["public speaking"],
      root_event: true,
      modified_by: userId,
      modified_at: new Date(),
      change_description: "Initial creation",
      attendees: [userId],
      participation_status: [{ user_id: userId, status: "confirmed" }],
      categories: ["education", "technology"],
      feedback: [{ user_id: userId, rating: 5, comments: "Great event!" }],
      external_ids: ["google_calendar_event_id"],
      languages_supported: ["English"],
      location_specifics: {
        country: "USA",
        region: "California",
        city: "Los Angeles",
        latitude: 34.0522,
        longitude: -118.2437
      },
      sustainability_focus: ["education"],
      partner_organizations: ["org1"],
      collaboration_level: "local",
      tech_requirements: ["projector"],
      tools_provided: ["handouts"],
      governance_model: "community-led",
      funding_source: "sponsorship",
      roles: ["admin"],
      permissions: ["create_event"],
      preferred_language: "English"
    };
    const insertedEventResult = await eventOperations.insertEvent(exampleEvent);
    const eventId = insertedEventResult.insertedId.toString();
    console.log("Inserted Event ID:", eventId);

    // Insert a new category
    const exampleCategory = {
      name: "Category Name"
    };
    const insertedCategoryResult = await categoryOperations.insertCategory(exampleCategory);
    const categoryId = insertedCategoryResult.insertedId.toString();
    console.log("Inserted Category ID:", categoryId);

    // Insert a new media
    const exampleMedia = {
      event_id: eventId,
      url: "http://example.com/media.jpg",
      type: "image",
      description: "An example image"
    };
    const insertedMediaResult = await mediaOperations.insertMedia(exampleMedia);
    const mediaId = insertedMediaResult.insertedId.toString();
    console.log("Inserted Media ID:", mediaId);

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
