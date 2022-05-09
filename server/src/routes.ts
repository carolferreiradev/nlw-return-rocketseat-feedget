import express from "express";

import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

import { PrismaFeedbacksRepository } from "./repositories/feedbacks/prisma/prisma-feedbacks-repository";

import { SubmitFeedbackUseCase } from "./use-cases/feedbacks-use-case/submit-feedback";
import { GetAllFeedbackUseCase } from "./use-cases/feedbacks-use-case/get-all-feedback";
import { GetByIdFeedbackUseCase } from "./use-cases/feedbacks-use-case/get-by-id-feedback/";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitRepository = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitRepository.execute({
      comment,
      type,
      screenshot,
    });

    return res.status(201).send();
  } catch (error) {
    return res.status(500).send();
  }
});

routes.get("/feedbacks", async (_, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const getAllRepository = new GetAllFeedbackUseCase(prismaFeedbacksRepository);
  const response = await getAllRepository.execute();

  return res.status(200).json({ data: response });
});

routes.get("/feedbacks/:id", async (req, res) => {
  const id = req.params.id;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const getByIdRepository = new GetByIdFeedbackUseCase(
    prismaFeedbacksRepository
  );
  const response = await getByIdRepository.execute(id);

  return res.status(200).json({ data: response });
});
