import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { alunosController } from 'src/controllers/alunos';
import { AlunosServiceImplementation } from 'src/service/alunoServiceImplementation';

export const deleteStudent = async (app: FastifyInstance) => {
  app.delete('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.deleteById(request, reply, alunosService);
    reply.send({ result });
  });
};
