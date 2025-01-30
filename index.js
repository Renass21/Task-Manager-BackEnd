const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDataBase();

app.get("/tasks", async (res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tasks/:id', async (req, res)=> {
    try {
        const taskId = req.params.id
        const tasks = await TaskModel.findById({taskId});
        if(!tasks){
            return res.status(404).send('Task not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.patch('/tassks/:id', async (req, res)=>{
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        
        const taskUpdate = await TaskModel.findByIdAndUpdate(taskId, taskData);
        if(!taskUpdate){
            return res.status(404).send('Task not found')
        }

        const allowedUpdates = ['isCompleted']
        const requestedUpdates = Object.keys(req.body)

        for(update of  requestedUpdates){
            if(allowedUpdates.includes(update)){
                taskUpdate[update] = req.body[update]
            } else {
                return res.status(403).send('Invalid update')
            }
        }
        await taskUpdate.save()
        res.status(200).send(taskUpdate)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).send("Task not found");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log("Listening on port 8000"));
