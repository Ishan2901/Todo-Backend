const Task = require("../models/task.model");

const createTask = async (taskData) => {
    const task = await Task.create(taskData);
    return await task.save();
}

const getAllTasks = async () => {
    return await Task.find();
}

const getTaskById = async (id) => {
    return await Task.findById(id);
}

const updateTask = async (id, updateData) => {
    return await Task.findByIdAndUpdate(id, updateData, { new : true });
}

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}