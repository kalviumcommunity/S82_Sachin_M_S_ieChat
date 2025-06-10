const mongoose = require("mongoose");

const MovieChatSchema = new mongoose.Schema({
  movieID: { type: String, required: true,ref: 'Movie'  },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MovieChat", MovieChatSchema);
