const express = require("express");
const router = express.Router();

const { createTodo, getSingleTodo, getAllTodos, updateTodo, deleteTodo } = require("../controllers/todo");


//define API routes
router.post("/createTodo", createTodo);
router.get("/getSingleTodo/:id", getSingleTodo);
router.get("/getAllTodos", getAllTodos);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;