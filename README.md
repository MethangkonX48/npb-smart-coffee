# ☕ NPB Smart Coffee Procurement
**ศูนย์กลางจัดซื้อกาแฟอัจฉริยะ** 

ระบบแพลตฟอร์มที่พัฒนาขึ้นเพื่อเพิ่มประสิทธิภาพ ความโปร่งใส และความรวดเร็วในกระบวนการจัดซื้อเมล็ดกาแฟ โดยเชื่อมโยงข้อมูลระหว่างเกษตรกร เจ้าหน้าที่ตรวจสอบคุณภาพ (QC) และผู้บริหารเข้าด้วยกันแบบเรียลไทม์

---

## 🛠️ เทคโนโลยีและโครงสร้างระบบ (Tech Stack)

### ส่วนแสดงผล (Frontend)
*   **UI & Styling:** HTML5, Tailwind CSS
*   **Logic:** Vanilla JavaScript (ES6)
*   **Icons:** Lucide Icons
*   **Hosting:** GitHub Pages

### ส่วนประมวลผลและฐานข้อมูล (Backend & Database)
*   **Server:** Node.js & Express.js
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **API:** RESTful API
*   **Hosting:** Render.com

### ความปลอดภัย (Security)
*   **Authentication:** ตรวจสอบสิทธิ์ผ่าน JWT (JSON Web Token)
*   **State Management:** จัดการ Session ผ่าน `localStorage`

---

## 📂 โครงสร้างโฟลเดอร์ (Project Structure)

```text
npb-smart-coffee/
├── frontend/               # โฟลเดอร์เก็บส่วนแสดงผลหน้าเว็บ
│   ├── index.html          # หน้าเข้าสู่ระบบ (Login) และหน้าแรก
│   ├── farmer.html         # แดชบอร์ดสำหรับเกษตรกร (Farmer Portal)
│   ├── qc.html             # หน้าจอสำหรับเจ้าหน้าที่ (QC Portal)
│   └── executive.html      # แดชบอร์ดสำหรับผู้บริหาร (Executive Dashboard)
├── backend/                # โฟลเดอร์เก็บส่วนประมวลผลเซิร์ฟเวอร์
│   ├── prisma/             # การจัดการฐานข้อมูล (schema.prisma)
│   ├── routes/             # เส้นทาง API (auth, coffee, farmer)
│   └── server.js           # ไฟล์หลักสำหรับรันเซิร์ฟเวอร์ (Express App)
└── README.md               # ไฟล์คู่มือและโครงสร้างโปรเจกต์ (ไฟล์นี้)