const express = require('express');
const mongoose = require('mongoose');
const router = require("./Routes/book-routes");
const app = express();

app.use(express.json());

app.use("/books", router);

mongoose.connect("mongodb+srv://ramiz:1234@cluster0.22i62sm.mongodb.net/sample")
    .then(() => {
        console.log("Connected to database");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
         
    });
