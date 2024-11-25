const Task = require('../models/Task');
const ResponseAPI = require('../utils/response');

const taskController = {
    async createTask(req, res, next) {
        try {
            const task = await Task.create({
                ...req.body,
                userId: req.user._id
            });

            ResponseAPI.success(res, task, 'Task created successfully', 201);
        } catch (error) {
            next(error)
        }
    },

    async getUserTasks(req, res, next) {
        try {
            const tasks = await Task.find({ userId: req.user._id });
            ResponseAPI.success(res, tasks);
        } catch (error) {
            next(error)
        }
    },

    async updateTaskStatus(req, res, next) {
        try {
            const task = await Task.findOne({
                _id: req.params.id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            task.isDone = true;
            await task.save();

            ResponseAPI.success(res, task);
        } catch (error) {
            next(error)
        }
    },

    async deleteTask(req, res, next) {
        try {
            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            ResponseAPI.success(res, null, 'Task deleted successfully');
        } catch (error) {
            next(error)
        }
    }
};

module.exports = taskController;