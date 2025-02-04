import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 記事のトピックスの全件取得。
export default defineEventHandler(async (event) => {
  try {
    const topics = await prisma.topic.findMany();

    return { success: true, result: topics };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
