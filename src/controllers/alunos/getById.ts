import { FastifyRequest, FastifyReply } from 'fastify';
import { alunosProvider } from 'src/providers/alunos/alunosProvider';
import z from 'zod';

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const idSchema = z.object({
      id: z.string(),
    });

    const { id } = idSchema.parse(request.params);
    const result = await alunosProvider.findById(id);

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
