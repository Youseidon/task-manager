const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("age must be possitive bro")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (validator.contains(value, "password")) {
                throw new Error("The password contains password word");
            }
        }
    }
})

//Create a function called findByCredentials
userSchema.statics.findByCredentials = async(email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login')
        }
    } catch (e) {

    }
}

//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User