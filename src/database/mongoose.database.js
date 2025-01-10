const mongoose = require("mongoose");

const connectToDataBase = async () => {
    try {
        await mongoose
            .connect(process.env.DATABASE_URL)
            .then(console.log("MongoDB conectando..."));
        console.log("MongoDB conectado!!!");
    } catch (error) {
        console.log("Erro ao conectar no MongoDB");
    }
};

module.exports = connectToDataBase;
