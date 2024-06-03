const Todo = require("../model/todoschema"); // Import the Todo model

// Get all todos
module.exports.getTodo = async (req, res) => {
    try {
        const allTodos = await Todo.find(); // Fetch all todos from the database
        if (!allTodos.length) { // Check if there are no todos
            return res.status(400).json({ error: "No todos found" }); // Respond with an error if no todos found
        }
        console.log(allTodos); // Log the fetched todos
        res.status(200).json({ message: allTodos }); // Respond with the fetched todos
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Function to search for todos by title // http://localhost:5000/search?todo="search"
module.exports.searchTodo = async (req, res) => {
    try {
        const searchTerm = req.query.todo; // Get the search term from the query parameters
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term 'todo' is required" }); // Return a 400 Bad Request if 'q' parameter is missing
        }

        const findData = await Todo.find().searchTodo(searchTerm); // Use the custom query method to find todos by title
        if (!findData.length) {
            return res.status(404).json({ message: "No todos found" }); // Return a 404 if no todos match the search term
        }

        res.status(200).json({ message: findData }); // Respond with the found todos
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Post a new todo
module.exports.postTodo = async (req, res) => {
    try {
        const newTodo = new Todo(req.body); // Create a new Todo instance with the request body
        await newTodo.save(); // Save the new todo to the database
        console.log(newTodo); // Log the new todo
        res.status(200).json({ message: "Successfully posted a new todo" }); // Respond with success message
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(400).json({ error: error.message }); // Respond with a client error
    }
};

// Post multiple todos
module.exports.multipleTodo = async (req, res) => {
    try {
        await Todo.insertMany(req.body); // Insert multiple todos from the request body
        res.status(200).json({ message: "Successfully inserted multiple todos" }); // Respond with success message
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Update a todo
module.exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id }, // Find the todo by ID from the request parameters
            { $set: req.body }, // Set the updated fields from the request body
            { new: true } // Return the updated document
        );
        if (!updatedTodo) { // Check if the todo was not found
            return res.status(404).json({ message: "Todo Not Found" }); // Respond with an error if todo not found
        }
        res.status(200).json({ message: updatedTodo }); // Respond with the updated todo
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Delete a todo
module.exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id; // Get the ID from request params
        const deleteTodo = await Todo.findByIdAndDelete(todoId); // Find and delete the document by ID
        console.log(deleteTodo); // Log the deleted todo
        if (!deleteTodo) { // Check if the todo was not found
            return res.status(404).json({ message: "Todo Not Found" }); // Return 404 if todo not found
        }
        res.status(200).json({ message: `Deleted todo with title: ${deleteTodo.title}` }); // Return success message with title of deleted todo
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Return error message if something goes wrong
    }
};
