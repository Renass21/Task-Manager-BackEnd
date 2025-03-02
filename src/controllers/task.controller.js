const TaskRepository = require("../repositories/taskRepository");

class TaskController {
   
    async getTasks(req, res) {
        try {
            const tasks = await TaskRepository.getTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).send("Erro ao obter tarefas: " + error.message);
        }
    }

     async getTaskById(req, res) {
        const { id } = req.params;
        try {
            const task = await TaskRepository.getTaskById(id);
            if (!task) {
                return res.status(404).send("Tarefa não encontrada");
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).send("Erro ao obter tarefa: " + error.message);
        }
    }

    
     async createTask(req, res) {
        const { description, isCompleted } = req.body;
        try {
            const newTask = await TaskRepository.createTask({ description, isCompleted });
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).send("Erro ao criar tarefa: " + error.message);
        }
    }

   
    async updateTask(req, res) {
        const { id } = req.params;
        const { description, isCompleted } = req.body;
        try {
            const updatedTask = await TaskRepository.updateTask(id, { description, isCompleted });
            if (!updatedTask) {
                return res.status(404).send("Tarefa não encontrada");
            }
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).send("Erro ao atualizar tarefa: " + error.message);
        }
    }

 
    async deleteTask(req, res) {
        const { id } = req.params;
        try {
            const deletedTask = await TaskRepository.deleteTask(id);
            if (!deletedTask) {
                return res.status(404).send("Tarefa não encontrada");
            }
            res.status(200).json(deletedTask);
        } catch (error) {
            res.status(500).send("Erro ao deletar tarefa: " + error.message);
        }
    }
}

module.exports = TaskController;
