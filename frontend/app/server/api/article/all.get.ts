import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 記事を全件取得
export default defineEventHandler(async (event) => {
  try {
    const articles = await prisma.article.findMany({
        include: {
          author: {
            select: { name: true },
          }
        }
    });

    return { result: articles };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
