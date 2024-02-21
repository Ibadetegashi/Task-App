const jwt = require('jsonwebtoken');
const { User } = require('../models');


const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'mysecretKey1')
        const user = await User.findOne({ _id: decode._id, "tokens.token": token })

        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        console.log(req.user);
        next();

    } catch (error) {
        console.error(error);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401)
                .send({ error: 'Token expired' });
            
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401)
                .send({ error: 'Invalid token' });
        }

        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth 