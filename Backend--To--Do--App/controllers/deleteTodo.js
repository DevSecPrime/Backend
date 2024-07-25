const Todo = require("../models/todo");

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "NOT Found...."
            })
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully..."
        })
    } catch (error) {
        console.log(error);
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server Error..."
        })
    }
}