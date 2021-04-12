const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

// USERS
router.get('/user/:email', UserCtrl.getUser);
router.post('/user', UserCtrl.createUser);
router.put('/user/:id', UserCtrl.updateUser);

module.exports = router;