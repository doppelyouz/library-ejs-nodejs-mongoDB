const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
  title: String,
  author: String,
  publisherName: String,
  publishingYear: Number,
  pages: Number,
  count: Number
})

module.exports = model("Book", bookSchema);