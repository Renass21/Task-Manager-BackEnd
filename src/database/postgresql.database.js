const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectToDataBase = async () => { 
    try { 
        const client = new Client({
            connectionString: process.env.DB_CONNECTION  
        });

        await client.connect();  
        console.log('PostgreSQL conectado com sucesso!');
        return client; 
    } catch (error) { 
        console.log("Erro ao conectar ao PostgreSQL", error);
    }}

    
module.exports = connectToDataBase;
