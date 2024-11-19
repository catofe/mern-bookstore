import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, URL } from "./config.js";
import { Book } from "./models/book.model.js";
import router from "./routes/book.routes.js";

const bookRouter = router;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type ']
// }))

app.use("/books", bookRouter);
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("MERN Stack Bookstore");
});

mongoose
    .connect(URL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
