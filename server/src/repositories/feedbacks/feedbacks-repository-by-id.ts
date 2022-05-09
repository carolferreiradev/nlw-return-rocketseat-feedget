export interface FeedbacksRepositoryByIdData {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
}

export interface FeedbacksRepositoryById {
  getById: (id: string) => Promise<FeedbacksRepositoryByIdData>;
}
