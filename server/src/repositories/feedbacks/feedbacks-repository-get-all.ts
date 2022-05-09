export interface FeedbackRepositoryAllData {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
}
export interface FeedbackRepositoryAll {
  getAll: () => Promise<FeedbackRepositoryAllData[]>;
}
