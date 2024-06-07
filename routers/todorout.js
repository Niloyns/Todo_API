const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object

const { 
    postTodo, // Import postTodo function from TodoController
    multipleTodo, // Import multipleTodo function from TodoController
    updateTodo, // Import updateTodo function from TodoController
    getTodo, // Import getTodo function from TodoController
    deleteTodo, // Import deleteTodo function from TodoController
    searchTodo, // Import searchTodo function from TodoController
    deleteMultipleTodosByIds // Import deleteMultipleTodosByIds function from TodoController
} = require("../controllers/TodoController"); // Import controller functions

const { changePassword } = require("../controllers/userController"); // Import changePassword function from userController

router.post("/", postTodo); // Handle the POST request to create a new todo
router.post("/all", multipleTodo); // Handle the POST request to create multiple todos
router.put("/:id", updateTodo); // Handle the PUT request to update an existing todo by ID
router.get("/", getTodo); // Handle the GET request to fetch all todos
router.get("/search", searchTodo); // Handle the GET request to search todos by title
router.delete("/:id", deleteTodo); // Handle the DELETE request to delete an existing todo by ID
router.post("/deleteMany", deleteMultipleTodosByIds); // Handle the DELETE request to delete multiple todos by IDs
router.post("/change-password", changePassword); // Handle the POST request to change a user's password

module.exports = router; // Export the router object
