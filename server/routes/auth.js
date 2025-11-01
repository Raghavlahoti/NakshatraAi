const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
], authController.register);

router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], authController.login);

module.exports = router;
