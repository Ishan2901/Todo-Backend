const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');
const taskRoutes = require("./routes/task.routes");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL).then(() => {
     console.log("Successfully connected to DB");
}).catch(error => console.log(`Could not connect to the database due to error ${error}`));

app.use('/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Process started listening on PORT ${process.env.PORT}`);
})