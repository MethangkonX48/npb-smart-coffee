require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

const users = [
  {
    username: 'farmer01',
    password: 'farmer123',
    fullName: 'สมชาย ใจดี',
    role: 'FARMER'
  },
  {
    username: 'qc01',
    password: 'qc123',
    fullName: 'ศิริพร ตรวจดี',
    role: 'QC_STAFF'
  },
  {
    username: 'exec01',
    password: 'exec123',
    fullName: 'อนันต์ บริหารดี',
    role: 'EXECUTIVE'
  }
];

async function main() {
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 12);

    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        passwordHash,
        fullName: user.fullName,
        role: user.role,
        isActive: true
      },
      create: {
        username: user.username,
        passwordHash,
        fullName: user.fullName,
        role: user.role,
        isActive: true
      }
    });
  }

  console.log('สร้างผู้ใช้ตัวอย่างเรียบร้อยแล้ว');
}

main()
  .catch((error) => {
    console.error('สร้างผู้ใช้ตัวอย่างไม่สำเร็จ:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
