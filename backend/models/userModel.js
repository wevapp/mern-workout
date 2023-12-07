const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation email and password
    if (!email || !password) {
        throw Error('All fields must be field')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email')
    }

    if (password.length < 6) {
        throw Error('Password atleast 6 and above characters')
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('Email already exist!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user
}

// static Login method
userSchema.statics.login = async function(email, password) {

    // validation email and password
    if (!email || !password) {
        throw Error('All fields must be field')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect Password!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema) // User Collection name