// mongoose model
const Todo = require("../models/todo.model");

module.exports = {
  getTodos,
  create,
  getById,
  update,
  delete: _delete
};

async function getTodos() {
  console.log("into todos");
  return await Todo.find();
}
async function getById(req) {
  let id = req.params.id;
  console.log("into get todo");
  return await Todo.findById(id);
}
async function create(todoParm) {
  console.log("into create todos");
  let todo = new Todo(todoParm);
  // todo._id = new mongoose.Types.ObjectId();
  console.log("todoParm  : ", todoParm);

  // save todo
  return await todo.save();
}
async function update(req) {
  console.log("into update todos");
  // let id = req.params.id;
  let todo = new Todo(req.body);
  // todo._id = new mongoose.Types.ObjectId();
  console.log("todoParm  : ", req.body);

  // save todo
  return await todo.save();
}

async function _delete(id) {
  await Todo.findByIdAndRemove(id);
}
