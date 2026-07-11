const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 🟢 สิ่งที่ขาดไป! เพิ่ม 2 บรรทัดนี้เพื่อให้ server.js รู้จัก Prisma คอยจัดการฐานข้อมูล
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes'); // เพิ่มเส้นทางกาแฟ

const app = express();
const port = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, '..', '..', 'frontend');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  return res.json({ status: 'ok', message: 'ระบบพร้อมใช้งาน' });
});

app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/coffee', coffeeRoutes); // เปิดใช้งานเส้นทางกาแฟ

// API สำหรับลบข้อมูลจัดซื้อ
app.delete('/api/coffeeLot/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // ⚠️ ถ้ามันยัง Error อยู่ แสดงว่าชื่อตารางในฐานข้อมูลไม่ได้ชื่อ coffee
    // ลองเช็คไฟล์ schema.prisma ดูครับว่า model ชื่ออะไร แล้วเปลี่ยนตรงนี้ให้ตรงกัน
    await prisma.coffee.delete({
      where: { 
        id: parseInt(id) 
      }
    });

    res.json({ message: 'ลบข้อมูลสำเร็จเรียบร้อย!' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
  }
});

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  return res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('เกิดข้อผิดพลาดในระบบ:', error);
  return res.status(500).json({ message: 'ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง' });
});

app.listen(port, () => {
  console.log(`ระบบ NPB Smart Coffee Procurement เปิดใช้งานที่ http://localhost:${port}`);
});
