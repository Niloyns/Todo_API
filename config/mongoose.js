const mongoose = require("mongoose"); // Import mongoose module

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/todosApi")
    .then(() => {
        console.log("mongodb connection success"); // Log success message if connection is successful
    })
    .catch((err) => {
        console.log(err); // Log error message if connection fails
    });

module.exports = mongoose; // Export the mongoose instance
