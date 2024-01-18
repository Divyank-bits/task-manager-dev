const User = require('../model/user')
const asyncHandler = require('../utils/catchasync')
const Task = require('../model/task');
const { softdelete } = require('../utils/wrapper');

const createTask = async (taskData, ownerId) => {
    const task = new Task({
        ...taskData,
        owner: ownerId
    });
    await task.save();
    return task;
}

const getTasksByOwner = async (ownerId, completed, limit, skip) => {
    const match = {};
    if (completed !== undefined) {
        match.completed = completed === 'true';
    }

    const tasks = await Task.find({ owner: ownerId, ...match })
        .limit(parseInt(limit))
        .skip(parseInt(skip));

    return tasks;
};

const getTaskByIdAndOwner = async (taskId, ownerId) => {
    const task = await Task.findOne({ _id: taskId, owner: ownerId });
    return task;
}

const updateTask = async (taskId, ownerId, updateData) => {
    const validKeys = ['description', 'completed'];
    const update = Object.keys(updateData);

    const isValidUpdate = update.every((key) => validKeys.includes(key));

    if (!isValidUpdate) {
        throw new Error("Invalid Update");
    }

    const task = await Task.findOne({ _id: taskId, owner: ownerId });

    if (!task) {
        throw new Error("Task not found");
    }

    update.forEach((key) => (task[key] = updateData[key]));

    await task.save();
    return task;
}

const deleteTask = async (taskId, ownerId) => {
    const task = await Task.findOne({ _id: taskId, owner: ownerId }); //findOneandDelete
    softdelete(task);
    return task;
}


module.exports = {
    createTask,
    getTasksByOwner,
    getTaskByIdAndOwner,
    updateTask,
    deleteTask
}
