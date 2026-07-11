const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

// เส้นทางสำหรับดึงข้อมูล (GET)
router.get('/', farmerController.getAllFarmers);

// เส้นทางสำหรับส่งข้อมูลเพื่อเพิ่มเกษตรกร (POST)
router.post('/', farmerController.createFarmer);
router.delete('/:id', farmerController.deleteFarmer);
router.patch('/:id', farmerController.updateFarmer);


module.exports = router;