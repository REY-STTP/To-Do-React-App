const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    matkul: {
        type: String,
        required: true,
        trim: true
    },
    dosen: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema)