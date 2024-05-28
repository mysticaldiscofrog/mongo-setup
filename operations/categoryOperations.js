const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const categoryTemplate = {
  name: ""
};

async function insertCategory(category) {
  const db = await connectDB();
  const newCategory = { ...categoryTemplate, ...category, _id: new ObjectId() };
  return await db.collection("MainCategories").insertOne(newCategory);
}

async function getCategoryById(id) {
  const db = await connectDB();
  return await db.collection("MainCategories").findOne({ _id: new ObjectId(id) });
}

async function updateCategory(id, updatedCategory) {
  const db = await connectDB();
  await db.collection("MainCategories").updateOne({ _id: new ObjectId(id) }, { $set: updatedCategory });
}

async function deleteCategory(id) {
  const db = await connectDB();
  await db.collection("MainCategories").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  insertCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
