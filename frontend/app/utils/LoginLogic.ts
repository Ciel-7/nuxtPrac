import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import RedisClient from './RedisClient';

const prisma = new PrismaClient();

// 通常ログインのログイン処理
const logic = async (email: string, password: string) => {
    const redis = new RedisClient();

    try {
        // データベースからユーザーを取得
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            // ユーザーが存在しない場合は認証失敗
            console.error("ユーザーが見つかりません:", email);
            return null;
        }

        const key = user.name;
        const maxAttempt = 5;
        // 失敗回数が既定値の場合ログイン失敗
        if (parseInt(await redis.get(key) || "0", 0) >= 5) {
            console.error("アカウントがロックされています");
            return null;
        }

        // パスワードを検証
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // パスワードが一致しない場合は認証失敗
            console.error("パスワードが一致しません");

            // 失敗回数をインクリメント
            const attempt = await redis.incr(key);

            // 失敗回数が1なら有効期限を設定
            if (attempt === 1) {
                await redis.expire(key, 300);
            }

            return null;
        }

        // 失敗回数をリセット
        await redis.delete(key);

        // 認証成功
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    } catch (error) {
        console.error("認証エラー:", error);
        return null; // エラー時は認証失敗として扱う
    }
}

export default logic;