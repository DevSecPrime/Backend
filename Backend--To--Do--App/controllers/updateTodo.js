const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updatedAt: Date.now() },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found..."
            })
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo is updated successfully.."
        })
    } catch (error) {
        console.log(error);
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server error..."
        })
    }

}