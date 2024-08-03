const express = require('express')

// Controller Functions
const { loginUser, signupUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router()

// Login Route
router.post('/login', loginUser)

// SignUp Route
router.post('/signup', signupUser)

// Get All Users Route
router.get('/', getUsers)

// Get a Single User Route
router.get('/:id', getUser)

// DELETE a User Route
router.delete('/:id', deleteUser)

// UPDATE a User Route
router.patch('/:id', updateUser)

module.exports = router