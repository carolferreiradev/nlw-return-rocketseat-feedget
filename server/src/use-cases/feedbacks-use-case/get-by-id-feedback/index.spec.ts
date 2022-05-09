import { GetByIdFeedbackUseCase } from "./";

const responseMocked = {
  id: "767c88c7-136c-40ba-9a69-10ff131847ee",
  type: "BUG",
  comment: "Tela travada",
  screenshot: null,
};
const getByIdFunction = async () => responseMocked;

const getFeedbackByIdMocked = new GetByIdFeedbackUseCase({
  getById: getByIdFunction,
});

describe("Get feedback by ID", () => {
  it("Should return onde feedback", async () => {
    const idMocked: string = "767c88c7-136c-40ba-9a69-10ff131847ee";
    const response = await getFeedbackByIdMocked.execute(idMocked);
    expect(response).toStrictEqual(responseMocked);
  });
  it("Should return a error if id is empty", async () => {
    const idMocked: string = "   ";
    expect(getFeedbackByIdMocked.execute(idMocked)).rejects.toThrow();
  });
});
