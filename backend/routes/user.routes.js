const { Router } = require('express');
const express = require ('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/', user.getUsers);
router.post('/signup', user.signup);
router.post('/addAdmin', user.addAdmin);
router.get('/:id', user.getUser);
router.post('/signin', user.signin);
router.put('/:id', user.editUser)
router.delete('/:id', user.deleteUser)


module.exports = router;