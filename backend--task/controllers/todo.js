const todo = require("../models/todoModel")

// create todo
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required..."
            })
        }

        const checkTodo = await todo.findOne({ title });

        if (checkTodo) {
            return res.status(400).json({
                success: false,
                message: "Todo already exists..."
            })
        }

        const newTodo = await todo.create({
            title,
            description
        })

        return res.status(200).json({
            success: true,
            message: "Todo created successfully...",
            data: newTodo
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error in creating todo..."
        })
    }
}

exports.getSingleTodo = async (req, res) => {
    try {
        const id = req.params.id;

        const singleTodo = await todo.findById({ _id: id });

        return res.status(200).json({
            success: true,
            data: singleTodo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error in fetching single todo..."
        })
    }
}

//get all todo
exports.getAllTodos = async (req, res) => {
    try {

        const todos = await todo.find({});

        if (!todos) {
            return res.status(401).json({
                success: false,
                mesage: "Todos not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: todos
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error in fetching single todo..."
        })
    }
}


exports.updateTodo = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, description } = req.body;

        const checkTodo = await todo.findById({ _id: id });

        if (!checkTodo) {
            return res.status(400).json({
                success: false,
                message: "todo not found...."
            })
        }

        const updateTodo = await todo.findByIdAndUpdate({ _id: id }, { title, description }, { new: true });

        return res.status(200).json({
            success: true,
            data: updateTodo,
            message: "Todo updated successfully..."
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error in update todo..."
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteTodo = await todo.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            mesage: "Todo deleted successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || error,
            message: "Error in deleting the data...."
        })
    }
}