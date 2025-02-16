const TaskModel = require('../models/task.model');
const { notFoundError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");
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
                    return notFoundError(this.res);
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
                return notFoundError(this.res);
            }
    
            const allowedUpdates = ['isCompleted']
            const requestedUpdates = Object.keys(req.body)
    
            for(update of  requestedUpdates){
                if(allowedUpdates.includes(update)){
                    taskUpdate[update] = req.body[update]
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
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
                return notFoundError(this.res);
               
            }
    
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    
            res.status(200).send(deletedTask);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;