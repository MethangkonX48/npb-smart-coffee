const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await prisma.user.findMany({
            where: { role: 'FARMER' },
            select: { id: true, username: true, role: true, createdAt: true }
        });
        res.status(200).json(farmers);
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
};

exports.createFarmer = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username: username }
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้นี้มีในระบบแล้ว' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newFarmer = await prisma.user.create({
            data: {
                username: username,
                passwordHash: hashedPassword,
                role: 'FARMER',
                fullName: username // 🟢 เพิ่มบรรทัดนี้! เพื่อส่งข้อมูล fullName เข้าฐานข้อมูล
            }
        });

        res.status(201).json({ message: 'เพิ่มบัญชีเกษตรกรสำเร็จ!', user: newFarmer });
    } catch (error) {
        console.error("Error creating farmer:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างบัญชี' });
    }
};

// ฟังก์ชัน 3: ลบเกษตรกร
// แก้ไขฟังก์ชัน deleteFarmer เป็นแบบนี้ครับ
exports.deleteFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        // 🟢 เอา parseInt ออก เพราะ ID ของคุณเป็น String ครับ
        await prisma.user.delete({ 
            where: { id: id } 
        });
        res.status(200).json({ message: 'ลบเกษตรกรสำเร็จ' });
    } catch (error) {
        console.error("Delete Error:", error); // ดู Error ใน Terminal ถ้ายังลบไม่ได้
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบ' });
    }
};

// ฟังก์ชัน 4: แก้ไขชื่อ หรือ รหัสผ่าน
// แก้ไขฟังก์ชัน updateFarmer ในไฟล์ backend/src/controllers/farmerController.js
exports.updateFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        
        let updateData = { username };
        if (password && password.trim() !== "") {
            updateData.passwordHash = await bcrypt.hash(password, 12);
        }

        // 🟢 เอา parseInt ออก เพราะ ID ของคุณเป็น String ครับ
        await prisma.user.update({
            where: { id: id }, 
            data: updateData
        });
        
        res.status(200).json({ message: 'แก้ไขข้อมูลสำเร็จ' });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไข' });
    }
};