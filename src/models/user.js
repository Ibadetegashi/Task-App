const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Task = require('./task');
const { Timestamp } = require('mongodb');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(value)) {
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            }
        },

    },
    tokens: [
        {
            token: {
                type: String,
                require: true,
            }
        }
    ],
},
    {
        timestamps: true,
    }
);

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//method for model instance
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign(
        { _id: user._id.toString() },
        'mysecretKey1',
        { expiresIn: "24h" });

    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token;
}


//Define  a static method (These methods can be called on the model itself)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user;

}

//middleware to hash password before save()
userSchema.pre('save', async function (next) {
    const user = this
    console.log(user);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//when the user deleted his/her account will be deleted all of its tasks 
userSchema.pre(
    'deleteOne',
    {
        document: true,
        query: false // this will make sure that the hook only runs for documents and not queries
    },
    async function (next) {
        const user = this;

        try {
            await Task.deleteMany({ owner: user._id },);
            next();
        } catch (error) {
            console.error('Error in pre middleware:', error);
        }
    })

const User = model('User', userSchema);

module.exports = User;
