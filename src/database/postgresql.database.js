const { Pool } = require("pg");  
const dotenv = require("dotenv");

dotenv.config();  

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,  
});


const connectToDataBase = async () => {
  try {
    const client = await pool.connect();  
    console.log('PostgreSQL conectado com sucesso!');
    return client; 
  } catch (error) {
    console.log("Erro ao conectar ao PostgreSQL", error);
    throw error;  
  }
};

module.exports = connectToDataBase;
