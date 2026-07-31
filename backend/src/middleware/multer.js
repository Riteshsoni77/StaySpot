const multer = require("multer");
const path = require("path");

const   { storage } = require("../../cloudConfig");
const upload = multer({ storage });



module.exports = upload;