import { FastifyRequest, FastifyReply } from 'fastify';
import { alunosProvider } from 'src/providers/alunos/alunosProvider';

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await alunosProvider.findMany();
    reply.send({ result });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
