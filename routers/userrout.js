const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object
const { postTodo, multipleTodo, updateTodo, getTodo, deleteTodo, searchTodo, deleteMultipleTodosByIds } = require("../controllers/TodoController"); // Import controller functions
const {signup, changePassword, login} = require("../controllers/userController");

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

// Handle the POST request to signup a new user
router.post("/signup", signup);

// Handle the POST request to change a user's password
router.post("/change-password", changePassword);

// Handle the POST request to login a user
router.post("/login", login);

module.exports = router; // Export the router object
