const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

router.post('/', coffeeController.createLot);
router.get('/', coffeeController.getAllLots);
router.get('/farmer/:username', coffeeController.getLotsByFarmer);
// 🟢 เส้นทางใหม่: สำหรับผู้บริหารดึงเฉพาะล็อตที่ผ่านเกณฑ์
router.get('/status/approved', coffeeController.getApprovedLots);
// 🟢 เส้นทางใหม่: สำหรับการจ่ายเงิน
router.patch('/pay/:id', coffeeController.markAsPaid);

module.exports = router;