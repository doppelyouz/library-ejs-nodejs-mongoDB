const {Schema, model,} = require("mongoose");

const visitorSchema = new Schema({
  name: String,
  phone: Number
})
module.exports = model("Visitor", visitorSchema);