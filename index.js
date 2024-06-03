const express = require("express");
const port = 5000;
const db = require("./config/mongoose");
const router = require("./routers/userrout");

const app = express();
app.use(express.json());

//routing
app.use("/",router);

//default error handeling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return res.status(200).json({ message: "Success" });
    }
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(port,()=>{
    console.log(`running on ${port} port`);
});