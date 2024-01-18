// // controllers/taskController.js

const Task = require('../model/task')
const User = require('../model/user')
// require('../services/userMethods');
// require('../services/userStatics');
const asynchandler = require('../utils/catchasync')
const {taskService}= require('../services')

const TaskController = {};

/*
@desc   Create a new task
@route  POST /api/v1/tasks
@access Private 
*/
TaskController.createTask = asynchandler(async (req, res) => {
    console.log('Task creating')
    const task = await taskService.createTask(req.body, req.user._id);
    res.status(201).json(task);
});

/*
@desc   Get tasks based on owner, completion status, limit, and skip
@route  GET /api/v1/tasks
@access Private 
*/
TaskController.getTasks = asynchandler(async (req, res) => {
    const tasks = await taskService.getTasksByOwner(
        req.user._id,
        req.query.completed,
        req.query.limit,
        req.query.skip
    );
    res.send(tasks);
});

/*
@desc   Get a task by its ID and owner
@route  GET /api/v1/tasks/:id
@access Private 
*/
TaskController.getTaskById = asynchandler(async (req, res) => {

    console.log(req.params.id)
    const task = await taskService.getTaskByIdAndOwner(req.params.id, req.user._id);
    if (!task) {
        return res.status(400).send("Hi");
    }
    // res.status(200).json(req.params)
    res.status(201).send(task);
});

/*
@desc   Update a task by its ID and owner
@route  PATCH /api/v1/tasks/:id
@access Private 
*/
TaskController.updateTask = asynchandler(async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

/*
@desc   Delete a task by its ID and owner
@route  DELETE /api/v1/tasks/:id
@access Private 
*/
TaskController.deleteTask = asynchandler(async (req, res) => {
    const task = await taskService.deleteTask(req.params.id, req.user._id);
    // const task = await taskService.getTaskByIdAndOwner(req.params.id, req.user._id);
    console.log(task.isDeleted)
    res.send(task);
});

module.exports = TaskController;