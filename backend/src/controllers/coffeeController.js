const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ฟังก์ชัน 1: บันทึกการรับกาแฟและประเมินเกรด
exports.createLot = async (req, res) => {
    try {
        // 🟢 เพิ่ม coffeeType เข้ามารับค่าจากหน้าเว็บ
        const { farmerName, weight, moisture, coffeeType } = req.body;

        // ประเมินสถานะอัตโนมัติ (ถ้าความชื้น <= 12% ให้ผ่าน)
        let status = 'PENDING';
        if (moisture <= 12) {
            status = 'APPROVED';
        } else {
            status = 'REJECTED';
        }

        const newLot = await prisma.coffeeLot.create({
            data: {
                farmerName,
                weight,
                moisture,
                status,
                coffeeType // 🟢 สั่งให้บันทึกลงฐานข้อมูล
            }
        });

        res.status(201).json({ message: 'บันทึกข้อมูลสำเร็จ', lot: newLot });
    } catch (error) {
        console.error("Error creating lot:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
};

// ฟังก์ชัน 2: ดึงข้อมูลกาแฟทั้งหมดไปโชว์ในตาราง
exports.getAllLots = async (req, res) => {
    try {
        const lots = await prisma.coffeeLot.findMany({
            orderBy: { createdAt: 'desc' } // เรียงจากใหม่ไปเก่า
        });
        res.status(200).json(lots);
    } catch (error) {
        console.error("Error fetching lots:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
};

// ฟังก์ชัน 3: ดึงข้อมูลกาแฟเฉพาะของเกษตรกรคนนั้นๆ (Farmer Portal)
exports.getLotsByFarmer = async (req, res) => {
    try {
        const { username } = req.params; // รับชื่อเกษตรกรจาก URL

        const lots = await prisma.coffeeLot.findMany({
            where: {
                farmerName: username // กรองเอาเฉพาะชื่อนี้
            },
            orderBy: { createdAt: 'desc' } // เรียงจากใหม่ไปเก่า
        });

        res.status(200).json(lots);
    } catch (error) {
        console.error("Error fetching farmer lots:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลของเกษตรกร' });
    }
};

// ฟังก์ชัน 4: ดึงเฉพาะข้อมูลกาแฟที่ "ผ่านเกณฑ์" (APPROVED) สำหรับผู้บริหาร
exports.getApprovedLots = async (req, res) => {
    try {
        const approvedLots = await prisma.coffeeLot.findMany({
            where: { status: 'APPROVED' },
            orderBy: { createdAt: 'desc' } // เรียงจากใหม่สุดไปเก่า
        });
        res.status(200).json(approvedLots);
    } catch (error) {
        console.error("Error fetching approved lots:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสั่งซื้อ' });
    }
};

// ฟังก์ชัน 5: อนุมัติการจ่ายเงิน (Mark as PAID)
exports.markAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        // อัปเดตสถานะเป็น PAID
        const updatedLot = await prisma.coffeeLot.update({
            where: { id: parseInt(id) },
            data: { status: 'PAID' }
        });

        res.status(200).json({ message: 'บันทึกการจ่ายเงินสำเร็จ!', lot: updatedLot });
    } catch (error) {
        console.error("Error marking as paid:", error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกการจ่ายเงิน' });
    }
};