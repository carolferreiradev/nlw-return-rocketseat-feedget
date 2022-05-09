import { GetAllFeedbackUseCase } from ".";

const allFeedbacksResponse = [
  {
    id: "767c88c7-136c-40ba-9a69-10ff131847ee",
    comment: "Tela travada",
    screenshot: null,
    type: "BUG",
  },
  {
    id: "0834accd-56c6-41a8-a68d-8e37274d5aa7",
    comment: "Tela travada",
    screenshot: null,
    type: "BUG",
  },
];

const getAllFeedbackMocked = new GetAllFeedbackUseCase({
  getAll: async () => allFeedbacksResponse,
});

describe("GetAll feedbacks", () => {
  it("Should same return all feedbacks", async () => {
    const response = await getAllFeedbackMocked.execute();
    const mocked = [
      {
        id: "767c88c7-136c-40ba-9a69-10ff131847ee",
        comment: "Tela travada",
        screenshot: null,
        type: "BUG",
      },
      {
        id: "0834accd-56c6-41a8-a68d-8e37274d5aa7",
        comment: "Tela travada",
        screenshot: null,
        type: "BUG",
      },
    ];
    expect(response).toStrictEqual(mocked);
  });
});
