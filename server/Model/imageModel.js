// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//   Title: String,
//   Description: String,
//   File: String,
//   Category: String,
// });

// const model = mongoose.model("Images", imageSchema);

// module.exports = model;

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  File: String,
  Category: String,
  ImageName:String,
  Sale:String
});


const model = mongoose.model('address', imageSchema)

module.exports = model