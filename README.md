# NPB Smart Coffee Procurement

โครงสร้างนี้เป็นงาน Phase 1 ตามเอกสารแนบ: ระบบเข้าสู่ระบบ, JWT, บทบาทผู้ใช้ และหน้า HTML แบบ Vanilla JavaScript

## วิธีเริ่มใช้งาน

1. ติดตั้งแพ็กเกจ

```powershell
npm install
```

2. คัดลอก `.env.example` เป็น `.env` แล้วปรับค่า `DATABASE_URL` และ `JWT_SECRET`

3. สร้างฐานข้อมูลและผู้ใช้ตัวอย่าง

```powershell
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

4. เปิดระบบ

```powershell
npm run dev
```

จากนั้นเปิด `http://localhost:3000`

## ผู้ใช้ตัวอย่าง

| บทบาท | ชื่อผู้ใช้ | รหัสผ่าน |
| --- | --- | --- |
| เกษตรกร | `farmer01` | `farmer123` |
| เจ้าหน้าที่ตรวจคุณภาพ | `qc01` | `qc123` |
| ผู้บริหาร | `exec01` | `exec123` |

## ไฟล์หลักของ Phase 1

- `backend/src/server.js` เซิร์ฟเวอร์ Express และ static frontend
- `backend/prisma/schema.prisma` แบบจำลองข้อมูลผู้ใช้
- `backend/src/controllers/authController.js` ระบบล็อกอินและข้อมูลผู้ใช้ปัจจุบัน
- `frontend/index.html` หน้าเข้าสู่ระบบพร้อมจัดเส้นทางตามบทบาท
- `frontend/farmer.html`, `frontend/qc.html`, `frontend/executive.html` หน้าปลายทางหลังล็อกอิน
