require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "drhpami4z",
  api_key: "136978455566254",
  api_secret: "5ewBEf8zCkmcweNYnAqbJLG165Y",
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "LinkedIn Clone",
  allowedFormats: ["jpeg", "png", "jpg"],
});

module.exports = { cloudinary, storage };
