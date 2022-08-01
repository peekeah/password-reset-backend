const express = require('express');
const user = require('../modules/user');
const router = express.Router();

router.post('/signup', user.signUp);
router.post('/login', user.login);
module.exports =  router;

