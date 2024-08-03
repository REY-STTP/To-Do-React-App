const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// Get All Tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id

    const tasks = await Task.find({ user_id }).sort({ createdAT: -1 })

    res.status(200).json(tasks)
}

// Get a Single Tasks
const getTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    const task = await Task.findById(id)

    if(!task) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    res.status(200).json(task)
}

// Create New Tasks
const createTask = async (req, res) => {
    const {matkul, dosen, deadline, deskripsi, completed} = req.body

    let emptyFields = []

    if (!matkul) {
        emptyFields.push('matkul')
    }
    if (!dosen) {
        emptyFields.push('dosen')
    }
    if (!deadline) {
        emptyFields.push('deadline')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Tolong isi semua bidang', emptyFields })
    }

    // add doc to DB
    try{
        const user_id = req.user._id

        const task = await Task.create({matkul, dosen, deadline, deskripsi, completed, user_id})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a Tasks
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    const task = await Task.findOneAndDelete({ _id: id})

    if(!task) {
        return res.status(400).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    res.status(200).json(task)
}

// UPDATE a Tasks
const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    const task = await Task.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if(!task) {
        return res.status(400).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    res.status(200).json(task)
}

module.exports = { getTasks, getTask, createTask, deleteTask, updateTask }