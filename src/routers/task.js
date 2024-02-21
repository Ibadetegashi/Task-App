const {
    createTask,
    getTasks,
    getTask,
    editTask,
    deleteTask
} = require('../controllers/task')
const auth = require('../middleware/auth')

const router = require('express').Router()

router.use(auth)
router.post('/', createTask)
router.get('/', getTasks)
router.route('/:id')
    .get(getTask)
    .patch(editTask)
    .delete(deleteTask)

module.exports = router