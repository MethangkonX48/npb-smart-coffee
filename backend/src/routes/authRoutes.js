const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// เปิดใช้งานเส้นทาง Login และ Me ตามปกติ
router.post('/login', authController.login);
router.get('/me', authController.me);

module.exports = router;