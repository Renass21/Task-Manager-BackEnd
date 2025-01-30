const mongoose = require("mongoose");

const connectToDataBase = async () => {
    try {
        await mongoose
            .connect(process.env.DATABASE_URL)
            .then(console.log("MongoDB conectando..."));
        console.log();
        return ("MongoDB conectado!!!", {status: 200});
    } catch (error) {
       return ("Erro ao conectar no MongoDB", {status: 500});
    }
};

module.exports = connectToDataBase;
