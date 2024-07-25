const Todo = require("../models/todo")


exports.createTodo = async (req, res) => {
    try {
        //extrace the title and description from req body
        const { title, description } = req.body

        //create a new todo database object
        const response = await Todo.create({ title, description });

        //send the json respone with the flag..
        res.status(200).json({
            success: true,
            data: response,
            message: "Todo Entity created successfully..."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: "internal server error...",
            message: error.message
        })
    }
}