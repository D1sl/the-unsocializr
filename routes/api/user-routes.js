const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)

module.exports = router;