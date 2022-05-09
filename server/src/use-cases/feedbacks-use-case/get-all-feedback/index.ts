import { FeedbackRepositoryAll } from "../../../repositories/feedbacks/feedbacks-repository-get-all";

export class GetAllFeedbackUseCase {
  constructor(private feedbackRepositoryAll: FeedbackRepositoryAll) {}

  async execute() {
    return this.feedbackRepositoryAll.getAll();
  }
}
