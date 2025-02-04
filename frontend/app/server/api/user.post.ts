import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// 新規ユーザ登録処理。入力値チェック、重複チェック後、パスワードをハッシュ化して保存
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password } = body;

    // nullチェック
    if (!name || !email || !password) {
      throw new Error('不足している入力項目があります。');
    }

    // メアド重複チェック
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
            provider: null
        },
    });
    if (existingUser != null){
        throw new Error('このメールアドレスのアカウントは既に存在しています。');
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新規ユーザ作成
    const newUser = await prisma.user.create({
      data: { 
        name: name, 
        email: email, 
        password: hashedPassword 
      }
    });

    return { success: true, result: newUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
