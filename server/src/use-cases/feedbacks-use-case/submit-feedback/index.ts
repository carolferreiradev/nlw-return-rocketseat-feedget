import { MailAdapter } from "../../../adapters/mail-adapter";
import { FeedbackRepository } from "../../../repositories/feedbacks/feedbacks-repository-create";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {} //adicionamos a tipagem do nosso contrato

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type.trim()) {
      throw new Error("Type must have content");
    }
    if (!comment.trim()) {
      throw new Error("Comment must have content");
    }
    if (screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid screenshot format");
    }
    await this.feedbackRepository.create({
      comment,
      type,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      body: [
        `<div style="font-family: sans-serif; font-size:16px;color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img alt="${comment}" src="${screenshot}" style="width: 100%;">`
          : ``,
        `</div>`,
      ].join("\n"),
      subject: "Novo feedback",
    });
  }
}
