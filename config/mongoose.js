const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todosApi")
.then(() => {
    console.log("mongodb conection success");
}).catch((err) => {
    console.log(err);
});

module.exports= mongoose;