class TaskModel {
    constructor(id, description, isCompleted) {
        this.id = id || undefined;
        this.description = description || '';
        this.isCompleted = isCompleted !== undefined ? isCompleted : false; 
    }
}

module.exports = TaskModel;
