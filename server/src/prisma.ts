import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"], //mostrar no console as operações efetuadas
});
