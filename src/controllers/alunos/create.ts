import { FastifyReply, FastifyRequest } from 'fastify';
import { AlunosService } from 'src/service/alunoService';
import z from 'zod';

export const create = async (request: FastifyRequest, reply: FastifyReply, alunosService: AlunosService) => {
  try {
    const AlunoSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      cpf: z.string().length(11),
      ra: z.string(),
    });

    const newAluno = AlunoSchema.parse(request.body);
    const result = await alunosService.create(newAluno);

    if (result instanceof Error) {
      return reply.status(500).send({
        errors: { default: result.message },
      });
    }

    reply.send({ id: result });
  } catch (error) {
    reply.status(400).send({ error: 'Dados inválidos' });
  }
};
