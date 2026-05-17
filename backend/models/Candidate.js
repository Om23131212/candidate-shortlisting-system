const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Candidate",
  candidateSchema
);