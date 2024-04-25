import { FastifyRequest, FastifyReply } from 'fastify';
import { AlunosService } from 'src/service/alunoService';
import z from 'zod';

export const getById = async (request: FastifyRequest, reply: FastifyReply, alunosService: AlunosService) => {
  try {
    const idSchema = z.object({
      id: z.string(),
    });

    const { id } = idSchema.parse(request.params);
    const result = await alunosService.getById(id);

    if (!result || result instanceof Error) {
      return reply.status(500).send({
        errors: { default: result?.message || 'Não há alunos com esse id.' },
      });
    }

    reply.send({ result });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
