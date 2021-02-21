const express = require('express');
const router = express.Router();
const { saveUser, login } = require('../controllers/users')

router.post('/saveUser', saveUser)
router.post('/login', login)


module.exports = router;