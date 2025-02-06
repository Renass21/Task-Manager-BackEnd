const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDataBase = async () => { 
    try { 
        await mongoose.connect( process.env.DB_CONNECTION) 
        console.log('MongoDB conectando...') 
       return console.log('MongoDB conectado') 
    } catch (error) { 
        console.log("Erro ao conectar no MongoDB", error)}}

    
module.exports = connectToDataBase;
