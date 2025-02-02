const TaskModel = require('../models/task.model');
 
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks(){
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById(){
        try {
                const taskId = req.params.id
                const tasks = await TaskModel.findById({taskId});
                if(!tasks){
                    return this.res.status(404).send('Task not found')
                }
            } catch (error) {
                this.res.status(500).send(error.message)
            }
    }
    async createTask(){
        try {
            const newTask = new TaskModel(req.body);
            await newTask.save();
    
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async updateTask(){
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
    }
    async deleteTask(){
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
    }
}

module.exports = TaskController;