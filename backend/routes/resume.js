// routes/resumes.js

const express = require('express');
const Resume = require('../models/Resume');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all resumes for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new resume
router.post('/', verifyToken, async (req, res) => {
  try {
    const newResume = new Resume({ ...req.body, userId: req.user.id });
    const savedResume = await newResume.save();
    res.json(savedResume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a resume
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a resume
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
