import { PrismaClient } from '@prisma/client';
import { getRouterParams } from 'h3';

const prisma = new PrismaClient();

// 指定したIDの記事情報を取得する
export default defineEventHandler(async (event) => {
  try {
    // 投稿ID値の取得
    const { postId } = getRouterParams(event);

    // 記事情報の取得
    const article = await prisma.article.findUnique({
      where: { id: Number(postId) },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    if (!article) {
      return { success: false, error: 'Article not found' };
    }

    return { result: article };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
