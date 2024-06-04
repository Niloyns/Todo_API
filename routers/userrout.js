const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object
const { postTodo, multipleTodo, updateTodo, getTodo, deleteTodo, searchTodo, deleteMultipleTodosByIds } = require("../controllers/userController"); // Import controller functions

// Handle the POST request to create a new todo
router.post("/", postTodo);

// Handle the POST request to create multiple todos
router.post("/all", multipleTodo);

// Handle the PUT request to update an existing todo by ID
router.put("/:id", updateTodo);

// Handle the GET request to fetch all todos
router.get("/", getTodo);

// Handle the GET request to search todos by title
router.get("/search", searchTodo);

// Handle the DELETE request to delete an existing todo by ID
router.delete("/:id", deleteTodo);

// Handle the DELETE request to delete multiple todos by IDs
router.post("/deleteMany", deleteMultipleTodosByIds);

module.exports = router; // Export the router object
