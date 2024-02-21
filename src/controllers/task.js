const { Task, User } = require('../models')
const {
    handleServerError,
    handleValidationError
} = require('../utils/errorHandler')

const createTask = async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.error("Error: ", error);
        error.name === 'ValidationError' ?
            handleValidationError(res, error) :
            handleServerError(res, error)
    }
};

//GET /tasks?completed=true
//GET /tasks?limit=3&&skip=2
//GET /tasks?sortBy=createdAt:asc
const getTasks = async (req, res) => {
    try {
        const match = {}
        const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            console.log(sort); //{createdAt:1}
        }
        const user = await req.user.populate({
            path: 'tasks', //with which field will be populated 
            match, //condition for populate
            options: {
                limit: +req.query.limit,
                skip: +req.query.skip,
                sort
            }
        })

        res.send(user.tasks)
    } catch (error) {
        console.log(error);
        handleServerError(res, error);
    }
}


const getTask = async (req, res) => {
    try {
        const task = await Task
            .findOne({
                _id: req.params.id,
                owner: req.user._id
            })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        console.log(error);
        handleServerError(res, error);
    }
}

const editTask = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {

        const task = await Task
            .findOne({
                _id: req.params.id,
                owner: req.user._id
            })

        if (!task) return res.status(404).send()

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()


        res.send(task)
    } catch (error) {
        console.error("Error: ", error);
        error.name === 'ValidationError' ?
            handleValidationError(res, error) :
            handleServerError(res, error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task
            .findOneAndDelete({
                _id: req.params.id,
                owner: req.user._id
            })

        if (!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        console.error("Error: ", error);
        handleServerError(res, error)
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    editTask,
    deleteTask
}