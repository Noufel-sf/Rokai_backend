// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmjez15fo',
  api_key: '948662315587572',
  api_secret: '9WE24OVtyj8w2kUJ6GhlALCUEgQ',
});

module.exports = cloudinary;
