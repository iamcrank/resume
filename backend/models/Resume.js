// models/Resume.js

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
  },
  education: [
    {
      institution: String,
      degree: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: [String],
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: [String],
    },
  ],
  template: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
