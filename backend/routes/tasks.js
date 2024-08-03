const express = require('express')
const { getTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET All Tasks Route
router.get('/', getTasks)

// GET a Single Tasks Route
router.get('/:id', getTask)

// POST a New Tasks Route
router.post('/', createTask)

// DELETE a Tasks Route
router.delete('/:id', deleteTask)

// UPDATE a Tasks Route
router.patch('/:id', updateTask)


module.exports = router