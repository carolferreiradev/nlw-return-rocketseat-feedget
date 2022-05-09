import { prisma } from "../../../prisma";
import {
  FeedbacksRepositoryById,
  FeedbacksRepositoryByIdData,
} from "../feedbacks-repository-by-id";
import {
  FeedbackCreateData,
  FeedbackRepository,
} from "../feedbacks-repository-create";
import {
  FeedbackRepositoryAll,
  FeedbackRepositoryAllData,
} from "../feedbacks-repository-get-all";

export class PrismaFeedbacksRepository
  implements FeedbackRepository, FeedbackRepositoryAll, FeedbacksRepositoryById
{
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        comment,
        type,
        screenshot,
      },
    });
  }
  async getAll(): Promise<FeedbackRepositoryAllData[]> {
    const response = await prisma.feedback.findMany({
      select: {
        id: true,
        comment: true,
        screenshot: true,
        type: true,
      },
    });

    return response ?? [];
  }
  async getById(id: string): Promise<FeedbacksRepositoryByIdData> {
    const response = await prisma.feedback.findUnique({
      where: {
        id: id,
      },
    });
    return response ?? ({} as FeedbacksRepositoryByIdData);
  }
}
