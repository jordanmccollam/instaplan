const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');
const ProjectCtrl = require('../controllers/project-ctrl');
const ItemCtrl = require('../controllers/item-ctrl');

const router = express.Router();

// USERS
router.get('/user/:email', UserCtrl.getUser);
router.post('/user', UserCtrl.createUser);
router.put('/user/:email', UserCtrl.updateUser);

// PROJECTS
router.post('/project', ProjectCtrl.createProject);
router.put('/project/:id', ProjectCtrl.updateProject);
router.delete('/project/:id', ProjectCtrl.deleteProject);

// PROJECTS
router.post('/item', ItemCtrl.createItem);
router.put('/item/:id', ItemCtrl.updateItem);
router.delete('/item/:id', ItemCtrl.deleteItem);

module.exports = router;