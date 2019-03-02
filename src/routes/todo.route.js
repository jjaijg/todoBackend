var express = require("express");
var router = express.Router();
// service
var todoService = require("../services/todo.service");

// mongoose model
var Todo = require("../models/todo.model");

// routes
router.get("/", getTodos);
router.post("/add", create);
router.get("/:id", getById);
router.post("/update/:id", update);
router.delete("/:id", _delete);

function getTodos(req, res, next) {
  todoService
    .getTodos()
    .then(todos => res.json(todos))
    .catch(err => console.log(err));
}
function getById(req, res, next) {
  todoService
    .getById(req)
    .then(todo => res.json(todo))
    .catch(err => console.log(err));
}
function create(req, res, next) {
  todoService
    .create(req.body)
    .then(todo => res.status(200).json({ todo: "Todo created successfully" }))
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: "Adding todo failed" });
    });
}
function update(req, res, next) {
  todoService
    .getById(req)
    .then(todo => {
      if (!todo) {
        res.status(404).json({ todo: "Todo data not found" });
      } else {
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_completed = req.body.todo_completed;

        todo
          .save()
          .then(todo => {
            res.status(200).json({ todo: "updated successfully" });
          })
          .catch(err => {
            res.status(400).json({ error: "updating failed" });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: "Updating todo failed" });
    });
}

function _delete(req, res, next) {
  todoService
    .delete(req.params.id)
    .then(() => res.json({ message: "Transaction deleted successfully" }))
    .catch(err => next(err));
}

module.exports = router;
