const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');

router.get("/", async (req, res) => {
    return new TaskController().getTasks(req, res);
});

router.get('/:id', async (req, res) => {
    return new TaskController().getTaskById(req, res);
});

router.post("/", async (req, res) => {
    return new TaskController().createTask(req, res);
});

router.patch('/:id', async (req, res) => {
    return new TaskController().updateTask(req, res);
});

router.delete("/:id", async (req, res) => {
    return new TaskController().deleteTask(req, res);
});

module.exports = router;
