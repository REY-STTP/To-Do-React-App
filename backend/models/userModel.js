const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

// Middleware untuk mengubah email menjadi lowercase sebelum disimpan
userSchema.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase()
    }
    if (this.username) {
        this.username = this.username.toLowerCase()
    }
    next()
})

// Static SignUp Method
userSchema.statics.signup = async function(nama, username, email, password) {
    // Validation
    if (!nama || !username || !email || !password) {
        throw Error('Semua bidang harus di isi!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email tidak valid!')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password tidak cukup kuat!')
    }

    const usernameRegex = /^[a-zA-Z0-9]{6,}$/
    if (!usernameRegex.test(username)) {
        throw Error('Username tidak valid! Username harus berisi minimal 6 karakter dan hanya boleh mengandung huruf dan angka.')
    }

    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })

    if (emailExists) {
        throw Error('Email telah digunakan!')
    }

    if (usernameExists) {
        throw Error('Username telah digunakan!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ nama, username, email, password: hash })

    return user
}

// Static Login Method
userSchema.statics.login = async function(usernameOrEmail, password) {
    // Validation
    if (!usernameOrEmail || !password) {
        throw Error('Semua bidang harus di isi!')
    }

    const user = await this.findOne({ 
        $or: [
            { email: usernameOrEmail.toLowerCase() }, 
            { username: usernameOrEmail.toLowerCase() }
        ] 
    })

    if (!user) {
        throw Error('Email atau Username salah!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Password salah!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)