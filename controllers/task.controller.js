const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../services/task.services");
const taskValidationSchema = require("../validations/task.validation");

const createTaskController = async (req, res) => {
    try {
    const { error, value } = taskValidationSchema.validate(req.body);
    if(error) return res.statsu(400).json({ message : error.details[0].message });
    const file = req.file ? { data : req.file.buffer, contentType : req.file.mimeType } : null;
    if(file) value.linkedFile = file;

    const newTask = await createTask(value);
    res.status(201).json(newTask);
    } catch (error) {
       res.status(500).json({ message : 'Failed to create task', errors : error});
    }
}

const getAllTasksController = async (req, res) => {
    try {
        const allTasks = await getAllTasks();
        if(!allTasks || allTasks.length === 0) return res.status(404).json({ message : "No task exists.Please create one" });

        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json({ message : 'All tasks api failed with internal server error '});
    }
}

const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
}

const updateTaskController = async (req, res) => {
    try {
        const { error, value } = taskValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedTask = await updateTask(req.params.id, value);
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const deletedTask = await deleteTask(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
};