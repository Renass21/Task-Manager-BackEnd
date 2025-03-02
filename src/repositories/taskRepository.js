const connectToDataBase = require("../database/postgresql.database");

class TaskRepository {
    // Criar uma nova tarefa
    static async createTask(taskData) {
        const { description, isCompleted } = taskData;
        const client = await connectToDataBase();
        const result = await client.query(
            "INSERT INTO task (description, is_completed) VALUES ($1, $2) RETURNING *",
            [description, isCompleted]
        );
        return result.rows[0];  // Retorna a nova tarefa criada
    }

    // Obter todas as tarefas
    static async getTasks() {
        const client = await connectToDataBase();
        const result = await client.query("SELECT * FROM task");
        return result.rows;  // Retorna todas as tarefas
    }

    // Obter tarefa por ID
    static async getTaskById(id) {
        const client = await connectToDataBase();
        const result = await client.query("SELECT * FROM task WHERE id = $1", [id]);
        return result.rows[0];  // Retorna a tarefa com o ID especificado
    }

    // Atualizar uma tarefa
    static async updateTask(id, taskData) {
        const { description, isCompleted } = taskData;
        const client = await connectToDataBase();
        const result = await client.query(
            "UPDATE task SET description = $1, is_completed = $2 WHERE id = $3 RETURNING *",
            [description, isCompleted, id]
        );
        return result.rows[0];  // Retorna a tarefa atualizada
    }

    // Deletar uma tarefa
    static async deleteTask(id) {
        const client = await connectToDataBase();
        const result = await client.query("DELETE FROM task WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];  // Retorna a tarefa deletada
    }
}

module.exports = TaskRepository;
