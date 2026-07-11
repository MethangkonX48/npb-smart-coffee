const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function buildToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET || 'npb_smart_coffee_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    role: user.role
  };
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน' });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const passwordMatched = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatched) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const token = buildToken(user);

    return res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      role: user.role,
      user: publicUser(user)
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub }
    });

    if (!user) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้ที่ใช้งานอยู่' });
    }

    return res.json({ user: publicUser(user) });
  } catch (error) {
    console.error("Me Error:", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};