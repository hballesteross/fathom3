import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

export const handleError = (e: unknown, reply: FastifyReply, statusCode: number = 404): void => {
    if (e instanceof Prisma.PrismaClientKnownRequestError && (e as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
        if (statusCode === 404) {
            reply.callNotFound();
        } else {
            reply.status(statusCode).send()
        }
    } else {
      throw e;
    }
  }
  