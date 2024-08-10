const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// Get All Tasks
const getTasks = async (req, res) => {
    try {
        const user_id = req.user._id
        const tasks = await Task.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// Get a Single Task
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    try {
        const task = await Task.findOne({ _id: id, user_id: req.user._id })
        if (!task) {
            return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
        }
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// Create New Task
const createTask = async (req, res) => {
    const { matkul, dosen, deadline, deskripsi, completed } = req.body

    let emptyFields = []

    if (!matkul) emptyFields.push('matkul')
    if (!dosen) emptyFields.push('dosen')
    if (!deadline) emptyFields.push('deadline')
    
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Tolong isi semua bidang', emptyFields })
    }

    try {
        const user_id = req.user._id
        const task = await Task.create({ matkul, dosen, deadline, deskripsi, completed, user_id })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a Task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    try {
        const task = await Task.findOneAndDelete({ _id: id, user_id: req.user._id })
        if (!task) {
            return res.status(400).json({ error: 'Daftar tugas tidak ditemukan.' })
        }
        res.status(200).json({ message: 'Daftar tugas berhasil dihapus!', task })
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// UPDATE a Task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
    }

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user_id: req.user._id },
            { ...req.body },
            { new: true }
        )
        if (!task) {
            return res.status(404).json({ error: 'Daftar tugas tidak ditemukan.' })
        }
        res.status(200).json({ message: 'Daftar tugas berhasil diupdate!', task })
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

module.exports = { getTasks, getTask, createTask, deleteTask, updateTask }