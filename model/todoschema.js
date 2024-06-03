const mongoose = require("mongoose"); // Import mongoose module

// Define a new schema for the Todo model
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Define the type of the title field as String
      required: true, // Make the title field required
    },
    description: {
      type: String, // Define the type of the description field as String
      required: true, // Make the description field required
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Add a custom query method to the schema for searching todos by title
todoSchema.query.searchTodo = function(searchitem) {
    return this.find({ title: new RegExp(searchitem, "i") }); // Use a regular expression for case-insensitive search
};

// Create a model named "Todo" using the todoSchema
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model
module.exports = Todo;
