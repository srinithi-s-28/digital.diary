const express = require('express');
const { createDiary, getDiaries, updateDiary, deleteDiary } = require('../controllers/diaryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// POST /api/diary
router.post('/', createDiary);

// GET /api/diary
router.get('/', getDiaries);

// PUT /api/diary/:id
router.put('/:id', updateDiary);

// DELETE /api/diary/:id
router.delete('/:id', deleteDiary);

module.exports = router;