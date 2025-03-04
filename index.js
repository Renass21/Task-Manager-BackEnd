const express = require("express");
const TaskRoutes = require("./src/routes/task.routes");
const cors = require("cors");
require("reflect-metadata");
const connectToDataBase = require("./src/database/postgresql.database");


const app = express();
app.use(cors());
app.use(express.json());

connectToDataBase();
app.use('/tasks', TaskRoutes);

app.listen(8000, () => console.log("Listening on port 8000"));
