const express = require("express");
const router = express.Router();
const {postTodo,multipleTodo,updateTodo,getTodo,deleteTodo} = require("../controllers/userController")

//handel the Router
router.post("/",postTodo);
router.post("/all",multipleTodo);
router.put("/:id",updateTodo);
router.get("/",getTodo);
router.delete("/:id",deleteTodo);

module.exports = router;