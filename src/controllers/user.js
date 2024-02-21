const { User } = require('../models');
const {
    handleValidationError,
    handleServerError
} = require('../utils/errorHandler');

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token });

    } catch (error) {
        console.error("Error: ", error);
        error.name === 'ValidationError' ?
            handleValidationError(res, error) :
            handleServerError(res, error)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        console.error("Error: ", error);
        res.status(400).send(error.message);
    }
}


//removing the token that was used to auth
const logout = async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (error) {
        handleServerError(res, error);
    }
};

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        handleServerError(res, error);

    }
}

// get logged in user
const getMe = async (req, res) => {
    res.send(req.user)
}

const editMe = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['fullname', 'email', 'password', 'role']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates" })
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        console.error("Error: ", error);

        error.name === 'ValidationError' ?
            handleValidationError(res, error) :
            handleServerError(res, error)
    }
}

const deleteMe = async (req, res) => {
    try {

        const deleteUser = await User.deleteOne({ _id: req.user._id })

        if (deleteUser) {
            return res.send({ message: "Deleted successfully!" })
        }

    } catch (error) {
        console.error("Error: ", error);
        handleServerError(res, error);
    }
};

module.exports = {
    createUser,
    getMe,
    editMe,
    deleteMe,
    login,
    logout,
    logoutAll
};