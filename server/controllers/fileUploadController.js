const fs = require("fs");
const path = require("path");
const ImageData = require("../models/imageSchema.js");
const ocrService = require("../services/ocrService.js");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const imagePath = path.resolve(`./uploads/${req.file.originalname}`);
    const extractedText = await ocrService.doOCR(imagePath);

    // Extracting bold words logic here (regex or HTML parsing)
    const boldWords = (extractedText.match(/<b>(.*?)<\/b>/g) || []).map((tag) =>
      tag.replace(/<\/?b>/g, "")
    );

    const base64Image = fs.readFileSync(imagePath, "base64");

    // Storing in MongoDB
    const imageData = new ImageData({
      image: base64Image,
      extractedText: extractedText,
      boldWords: boldWords,
    });
    await imageData.save();

    // Remove the file after processing
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } else {
        console.log("File deleted successfully");
      }
    });

    res.status(200).json({
      message: "Image uploaded and processed successfully",
      result: {
        image: base64Image,
        text: extractedText,
        boldWords: boldWords,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  uploadImage,
};
