const {
    createUser,
    getUser,
    editUser,
    deleteUser,
    login,
    getMe,
    logout,
    logoutAll,
    deleteMe,
    editMe
} = require('../controllers/user');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/', createUser)
router.post('/login', login)

router.use(auth)
router.post('/logout', logout)
router.post('/logoutAll', logoutAll)
router.route('/me')
    .get(getMe)
    .delete(deleteMe)
    .patch(editMe)





module.exports = router;
