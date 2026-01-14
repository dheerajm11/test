const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTask,
    setTask,
    updateTask,
    deleteTask,
    getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/stats').get(protect, getTaskStats);
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
