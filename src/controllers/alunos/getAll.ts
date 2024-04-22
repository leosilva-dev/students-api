import { FastifyRequest, FastifyReply } from 'fastify';

export const getAll = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const data = ['recurso1', 'recurso2', 'recurso3'];

    reply.send({ data });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
