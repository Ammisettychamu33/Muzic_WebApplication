const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Album', albumSchema);