import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// 記事の新規登録処理。nullチェックの後登録する。
export default defineEventHandler(async (event) => {
  try {
    const sendBody = await readBody(event);
    const { title, body, topics, id } = sendBody;

    if (!title || !body) {
      throw new Error('不足している入力項目があります。');
    }

    const newArticle = await prisma.article.create({
      include: {
        author: true
      },
      data: { 
        title: title, 
        body: body, 
        topics: topics,
        author: {
            connect: { id: parseInt(id, 10) },
        }
      }
    });

    return { success: true, result: newArticle };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
