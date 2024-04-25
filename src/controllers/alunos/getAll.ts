import { FastifyRequest, FastifyReply } from 'fastify';
import { AlunosService } from 'src/service/alunoService';

export const getAll = async (request: FastifyRequest, reply: FastifyReply, alunosService: AlunosService) => {
  try {
    const result = await alunosService.getAll();
    reply.send({ result });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
