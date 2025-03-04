const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');
const taskController = new TaskController();

router.get("/", async (req, res) => {
    return taskController.getTasks(req, res);
});

router.get('/:id', async (req, res) => {
    return taskController.getTaskById(req, res);
});

router.post("/", async (req, res) => {
    return taskController.createTask(req, res);
});

router.put('/:id', async (req, res) => {
    return taskController.updateTask(req, res);
});

router.delete("/:id", async (req, res) => {
    return taskController.deleteTask(req, res);
});

module.exports = router;
