import { FeedbacksRepositoryById } from "../../../repositories/feedbacks/feedbacks-repository-by-id";

export class GetByIdFeedbackUseCase {
  constructor(private feedbackById: FeedbacksRepositoryById) {}

  async execute(id: string) {
    if (!id.trim()) {
      throw new Error("ID must have content");
    }

    return this.feedbackById.getById(id);
  }
}
