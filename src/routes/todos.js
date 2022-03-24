const express = require("express");
const { route } = require("../../../example-api/src/routes/posts");
const router = express.Router();
const { todoControllers } = require("../controllers");

router.get("/", todoControllers.getAllTodos);
router.post("/", todoControllers.createNewTodo);
router.delete("/:id", todoControllers.deleteTodoById);
router.patch("/:id", todoControllers.editTodoById);

module.exports = router;
