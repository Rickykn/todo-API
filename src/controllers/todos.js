const todoDB = require("../database");
const { nanoid } = require("nanoid");

const todoControllers = {
  getAllTodos: (req, res) => {
    if (!todoDB.length) {
      res.status(404).json({
        message: "No Posts found",
      });
      return;
    }

    res.status(200).json({
      message: "Get todos",
      result: todoDB,
    });
  },
  createNewTodo: (req, res) => {
    const newTodo = req.body;
    if (!newTodo) {
      res.status(400).json({
        message: "Employee data is required",
      });
      return;
    }

    newTodo.id = nanoid();
    newTodo.status = false;

    todoDB.push(newTodo);

    res.status(201).json({
      message: "Created employee",
      result: newTodo,
    });
  },
  deleteTodoById: (req, res) => {
    const todoId = req.params.id;

    const findIdx = todoDB.findIndex((val) => {
      return val.id == todoId;
    });

    if (findIdx == -1) {
      res.status(404).json({
        message: "todo not found",
      });
      return;
    }

    todoDB.splice(findIdx, 1);

    res.status(200).json({
      message: "Deleted todo",
    });
  },
  editTodoById: (req, res) => {
    const todoId = req.params.id;
    const editTodoData = req.body;

    const findIdx = todoDB.findIndex((val) => {
      return val.id == todoId;
    });

    if (findIdx == -1) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    todoDB[findIdx] = {
      ...todoDB[findIdx],
      ...editTodoData,
    };

    res.status(200).json({
      message: "Status Change",
    });
  },
};

module.exports = todoControllers;
