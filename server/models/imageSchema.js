const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  extractedText: { type: String },
  boldWords: { type: [String] },
});

const ImageSchema = mongoose.model("image", imageSchema);

module.exports = ImageSchema;
