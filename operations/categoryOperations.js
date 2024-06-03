const connectDB = require('../connect');
const { ObjectId } = require('mongodb');

const categoryTemplate = {
  category_id: "",
  name: ""
};

async function insertCategory(category) {
  const db = await connectDB();
  const newCategory = { ...categoryTemplate, ...category, _id: new ObjectId() };
  return await db.collection("Categories").insertOne(newCategory);
}

async function getCategoryById(id) {
  const db = await connectDB();
  return await db.collection("Categories").findOne({ _id: new ObjectId(id) });
}

async function updateCategory(id, updatedCategory) {
  const db = await connectDB();
  await db.collection("Categories").updateOne({ _id: new ObjectId(id) }, { $set: updatedCategory });
}

async function deleteCategory(id) {
  const db = await connectDB();
  await db.collection("Categories").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  insertCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
