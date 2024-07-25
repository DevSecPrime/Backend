const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
    try {
        //fetch all items fromthe database...
        const todos = await Todo.find({})

        //response
        res.status(200).json({
            success: true,
            data: todos,
            message: "Todos are fetched successfully... "
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server error..."
        })

    }
}


exports.getSingleTodo = async (req, res) => {
    try {
        //get todo on the basis of id
        //extract id from the dbs 
        
        const id = req.params.id;

        const todo = await Todo.findById({ _id: id });


        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found...."
            })
        }
        console.log("todo:", todo);

        res.status(200).json({
            success: true,
            data: todo,
            message: "Single todo fetched successfully..."
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