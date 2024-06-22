const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/fileUploadController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Upload endpoint
router.post("/upload", upload.single("image"), uploadController.uploadImage);
// router.get("/get", uploadController.getData);

module.exports = router;
