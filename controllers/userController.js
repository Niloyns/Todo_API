const Todo = require("../model/todoschema");

// Get all todos
module.exports.getTodo = async (req, res) => {
    try {
        const allTodos = await Todo.find();
        if (!allTodos.length) {
            return res.status(400).json({ error: "No todos found" });
        }
        console.log(allTodos);
        res.status(200).json({ message: allTodos });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Post a new todo
module.exports.postTodo = async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        console.log(newTodo);
        res.status(200).json({ message: "Successfully posted a new todo" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Post multiple todos
module.exports.multipleTodo = async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({ message: "Successfully inserted multiple todos" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update a todo
module.exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo Not Found" });
        }
        res.status(200).json({ message: updatedTodo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete a todo
module.exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id; // Get the ID from request params
        const deleteTodo = await Todo.findByIdAndDelete(todoId); // Find and delete the document by ID
        console.log(deleteTodo);
        if (!deleteTodo) {
            return res.status(404).json({ message: "Todo Not Found" }); // Return 404 if todo not found
        }
        res.status(200).json({ message: `Deleted todo with title: ${deleteTodo.title}` }); // Return success message with title of deleted todo
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message }); // Return error message if something goes wrong
    }
};
