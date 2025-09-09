const { Pool } = require("pg");  
const dotenv = require("dotenv");

dotenv.config();  

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,  
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000
});

pool.on('error', (err, client) => {
  console.error('Erro de conexão com o banco de dados', err);
  process.exit(-1);  // Saia ou faça um tratamento adequado
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
