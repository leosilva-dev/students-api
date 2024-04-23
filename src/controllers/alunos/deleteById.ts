import { FastifyRequest, FastifyReply } from 'fastify';
import { alunosProvider } from 'src/providers/alunos/alunosProvider';
import z from 'zod';

export const deleteById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const idSchema = z.object({
      id: z.string(),
    });

    const { id } = idSchema.parse(request.params);
    const result = await alunosProvider.deleteById(id);

    const message = result ? 'Aluno excluído com sucesso.' : 'Erro ao excluir aluno.';

    reply.send({ message });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter recursos.' });
  }
};
