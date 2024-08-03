const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Login User
const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body

    try {
        const user = await User.login(usernameOrEmail, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({ nama: user.nama, username: user.username, email: user.email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// SignUp User
const signupUser = async (req, res) => {
    const { nama, username, email, password } = req.body

    try {
        const user = await User.signup(nama, username.toLowerCase(), email.toLowerCase(), password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({ nama: user.nama, username: user.username, email: user.email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get All Users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAT: -1 })

    res.status(200).json(users)
}

// Get a Single User
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User Tidak Ditemukan!' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'User Tidak Ditemukan!' })
    }

    res.status(200).json(user)
}

// DELETE a User
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User Tidak Ditemukan!' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'User Tidak Ditemukan!' })
    }

    res.status(200).json(user)
}

// UPDATE a User
const updateUser = async (req, res) => {
    const { id } = req.params
    const { nama, username, email, password } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User Tidak Ditemukan!' })
    }

    try {
        const currentUser = await User.findById(id)
        if (!currentUser) {
            return res.status(404).json({ error: 'User Tidak Ditemukan!' })
        }

        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Email tidak valid!' })
            }

            if (email.toLowerCase() === currentUser.email.toLowerCase()) {
                return res.status(400).json({ error: 'Anda memasukkan email yang sama!' })
            }

            const existingEmail = await User.findOne({ email: email.toLowerCase() })
            if (existingEmail) {
                return res.status(400).json({ error: 'Email sudah digunakan oleh user lain!' })
            }
        }

        if (username) {
            if (username.toLowerCase() === currentUser.username.toLowerCase()) {
                return res.status(400).json({ error: 'Anda memasukkan username yang sama!' })
            }

            const existingUsername = await User.findOne({ username: username.toLowerCase() })
            if (existingUsername) {
                return res.status(400).json({ error: 'Username sudah digunakan oleh user lain!' })
            }

            const usernameRegex = /^[a-zA-Z0-9]{6,}$/
            if (!usernameRegex.test(username)) {
                return res.status(400).json({ error: 'Username tidak valid! Username harus berisi minimal 6 karakter dan hanya boleh mengandung huruf dan angka.' })
            }
        }

        if (password && !validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password tidak cukup kuat!' })
        }

        if (password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(password, salt)
        }

        const updatedData = {
            nama: nama || currentUser.nama,
            username: username ? username.toLowerCase() : currentUser.username,
            email: email ? email.toLowerCase() : currentUser.email,
            password: password ? req.body.password : currentUser.password
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Bidang harus di isi!' })
    }
}

module.exports = { loginUser, signupUser, getUsers, getUser, deleteUser, updateUser }