const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object
const user = require("../routers/userrout"); // Import the user routes
const { signup, login } = require("../controllers/userController"); // Import controller functions
const { verifyToken } = require("../config/verifyJwtToken"); // Import token verification middleware

// Handle the POST request to signup a new user
router.post("/signup", signup);

// Handle the POST request to login a user
router.post("/login", login);

// Use token verification middleware and user routes for all /todo routes
router.use("/todo", verifyToken, user);

module.exports = router; // Export the router object
