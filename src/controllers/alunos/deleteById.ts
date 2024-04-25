import { FastifyRequest, FastifyReply } from 'fastify';
import { AlunosService } from 'src/service/alunoService';
import z from 'zod';

export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply,
  alunosService: AlunosService,
) => {
  try {
    const idSchema = z.object({
      id: z.string(),
    });

    const { id } = idSchema.parse(request.params);
    const result = await alunosService.deleteById(id);

    const message = result ? 'Aluno excluído com sucesso.' : 'Erro ao excluir aluno.';

    reply.send({ message });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
