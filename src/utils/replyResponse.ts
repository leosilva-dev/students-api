import { FastifyReply } from 'fastify';

export const sendOkResponse = <T>(reply: FastifyReply, data: T): void => {
  reply.code(200).send(data);
};

export const responseBadRequest = (reply: FastifyReply, error: string): void => {
  reply.code(400).send(error);
};

export const notFound = (reply: FastifyReply, error: string): void => {
  reply.code(404).send(error);
};

export const responseInternalServerError = (reply: FastifyReply, error: string): void => {
  reply.code(500).send(error);
};
