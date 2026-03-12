const express = require('express');
const {
    getTasks,
    createTask,
    updateTaskStatus,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router
    .route('/')
    .get(getTasks)
    .post(createTask);

router
    .route('/:id')
    .put(updateTask)
    .delete(deleteTask);

router
    .route('/:id/status')
    .patch(updateTaskStatus);

module.exports = router;
