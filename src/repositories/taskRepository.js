const connectToDataBase = require("../database/postgresql.database");

class TaskRepository {

    static async createTask(taskData) {
        const { description, isCompleted } = taskData;
        const client = await connectToDataBase();
        try {
            const result = await client.query(
                "INSERT INTO task (description, is_completed) VALUES ($1, $2) RETURNING *",
                [description, isCompleted]
            );
            return result.rows[0];  // Retorna a nova tarefa criada
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            throw new Error("Erro ao criar tarefa");
        } finally {
            client.release();  
        }
    }

    static async getTasks() {
        const client = await connectToDataBase();
        try {
            const result = await client.query("SELECT * FROM task");
            return result.rows; 
        } catch (error) {
            console.error("Erro ao obter tarefas:", error);
            throw new Error("Erro ao obter tarefas");
        } finally {
            client.release(); 
        }
    }

    static async getTaskById(id) {
        const client = await connectToDataBase();
        try {
            const result = await client.query("SELECT * FROM task WHERE id = $1", [id]);
            return result.rows[0]; 
        } catch (error) {
            console.error("Erro ao obter tarefa por ID:", error);
            throw new Error("Erro ao obter tarefa por ID");
        } finally {
            client.release(); 
        }
    }

    static async updateTask(id, taskData) {
        const { description, isCompleted } = taskData;
        const client = await connectToDataBase();
        try {
            const result = await client.query(
                "UPDATE task SET description = $1, is_completed = $2 WHERE id = $3 RETURNING *",
                [description, isCompleted, id]
            );
            return result.rows[0];  
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            throw new Error("Erro ao atualizar tarefa");
        } finally {
            client.release();
        }
    }

    static async deleteTask(id) {
        const client = await connectToDataBase();
        try {
            const result = await client.query("DELETE FROM task WHERE id = $1 RETURNING *", [id]);
            return result.rows[0]; 
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            throw new Error("Erro ao deletar tarefa");
        } finally {
            client.release();  //
        }
    }
}
module.exports = TaskRepository;
