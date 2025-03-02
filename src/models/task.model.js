
const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

class TaskModel {
    constructor() {
        this.id = undefined;
        this.description = undefined;
        this.isCompleted = false;
    }
}

Object.defineProperty(TaskModel, "name", { value: 'task' }); 
TaskModel = Entity()(TaskModel);


TaskModel = PrimaryGeneratedColumn()(TaskModel, "id");
TaskModel = Column("varchar")(TaskModel, "description");
TaskModel = Column({ type: "boolean", default: false })(TaskModel, "isCompleted");

module.exports = TaskModel;
