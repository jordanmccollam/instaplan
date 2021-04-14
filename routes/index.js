const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');
const ProjectCtrl = require('../controllers/project-ctrl');
const ItemCtrl = require('../controllers/item-ctrl');

const router = express.Router();

// USERS
router.get('/user/:email', UserCtrl.getUser);
router.post('/user', UserCtrl.createUser);
router.put('/user/:id', UserCtrl.updateUser);

// PROJECTS
router.post('/project', ProjectCtrl.createProject);
router.put('/project/:id', ProjectCtrl.updateProject);
// PROJECTS
router.post('/item', ItemCtrl.createItem);
router.put('/item/:id', ItemCtrl.updateItem);

module.exports = router;