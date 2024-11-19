import express from "express";
import { Book } from "../models/book.model.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        const requestError = {
            message: "Send all required fields: titel, author, publishYear.",
        };

        if (!request.body.title) {
            return response.status(400).send(requestError);
        }
        if (!request.body.author) {
            return response.status(400).send(requestError);
        }
        if (!request.body.publishYear) {
            return response.status(400).send(requestError);
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found." });
        }

        return response
            .status(200)
            .send({ message: "book updated successfully." });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Book not found." });
        }

        return response
            .status(200)
            .send({ message: "book deleted successfully." });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
