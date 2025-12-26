const Diary = require('../models/Diary');

// Create diary entry
const createDiary = async (req, res) => {
  try {
    const { title, content, mood, date } = req.body;
    
    const diary = await Diary.create({
      title,
      content,
      mood,
      date: date || new Date(),
      user: req.user._id
    });

    res.status(201).json({
      message: 'Diary entry created successfully',
      diary
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all diary entries for user
const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ diaries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update diary entry
const updateDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood, date } = req.body;

    const diary = await Diary.findOne({ _id: id, user: req.user._id });
    if (!diary) {
      return res.status(404).json({ message: 'Diary entry not found' });
    }

    const updatedDiary = await Diary.findByIdAndUpdate(
      id,
      { title, content, mood, date },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Diary entry updated successfully',
      diary: updatedDiary
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete diary entry
const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findOne({ _id: id, user: req.user._id });
    if (!diary) {
      return res.status(404).json({ message: 'Diary entry not found' });
    }

    await Diary.findByIdAndDelete(id);
    res.json({ message: 'Diary entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDiary, getDiaries, updateDiary, deleteDiary };