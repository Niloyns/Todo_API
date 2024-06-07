const Todo = require("../model/todoschema"); // Import the Todo model

// Get all todos
module.exports.getTodo = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID from the request
        const userTodos = await Todo.find().populate('user', 'name username'); // Fetch todos specific to the user and populate user details
        
        if (!userTodos.length) { // Check if there are no todos for the user
            return res.status(404).json({ error: 'No todos found for this user' }); // Respond with an error if no todos found
        }

        console.log(userTodos); // Log the fetched todos
        res.status(200).json({ todos: userTodos }); // Respond with the fetched todos
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Function to search for todos by title // http://localhost:5000/todo/search?todo="search"
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
exports.postTodo = async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id; // Assuming req.user contains the authenticated user's ID
  
      const newTodo = new Todo({
        title,
        description,
        user: userId, // Assign the authenticated user's ID to the todo's user field
      });
  
      await newTodo.save();
      res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Post multiple todos
module.exports.multipleTodo = async (req, res) => {
    const todos = req.body.map(todo => ({ // Map through each todo in the request body /  param=>({key:value}) its a diract return arrow functions
        ...todo, // Spread the properties of each todo
        user: req.user.id, // Assign the authenticated user's ID to each todo's user field
    }));

    try {
        await Todo.insertMany(todos); // Insert multiple todos into the database
        res.status(200).json({ message: "Successfully inserted multiple todos" }); // Respond with a success message
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

// Delete multiple todos by IDs
module.exports.deleteMultipleTodosByIds = async (req, res) => {
    try {
        const ids = req.body.ids; // Assume the IDs are sent in the request body as an array
        if (!ids || !Array.isArray(ids)) { // Check if IDs are provided and are in an array format
            return res.status(400).json({ error: "No valid IDs provided" }); // Return error if IDs are not valid
        }

        const result = await Todo.deleteMany({ _id: { $in: ids } }); // Use deleteMany with $in operator to match and delete the provided IDs
        if (result.deletedCount === 0) { // Check if any todos were deleted
            return res.status(404).json({ message: "No todos matched the provided IDs" }); // Return error if no todos matched the provided IDs
        }
        
        res.status(200).json({ message: `${result.deletedCount} todos deleted` }); // Return success message with the number of deleted todos
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

