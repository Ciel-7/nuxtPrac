import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// OAuthユーザのプロバイダ名とプロバイダ側のIDを元にユーザIDを取得する
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const userId = await prisma.user.findFirst({
        where: {
            provider: query.providerName,
            providerId: parseInt(query.providerId, 10)
        },
        select: {
            id: true
        }
    });

    return { success: true, result: userId };
  } catch (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
});
