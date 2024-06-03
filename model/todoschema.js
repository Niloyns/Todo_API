const mongoose = require("mongoose"); // Import mongoose module

// Define a new schema for the Todo model
const todoSchema = new mongoose.Schema({
    title: {
        type: String, // Define the type of the title field as String
        required: true // Make the title field required
    },
    description: {
        type: String, // Define the type of the description field as String
        required: true // Make the description field required
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Create a model named "Todo" using the todoSchema
const Todo = new mongoose.model("Todo", todoSchema);

// Export the Todo model
module.exports = Todo;
