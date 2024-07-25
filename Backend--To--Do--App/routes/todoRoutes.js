const express = require("express");
const router = express.Router();

//import controllers
const { createTodo } = require("../controllers/createToDo");
const { getTodo, getSingleTodo } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");


//define API routes...\

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getSingleTodo/:id", getSingleTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);


module.exports = router;
