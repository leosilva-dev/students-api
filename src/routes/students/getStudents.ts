import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { alunosController } from 'src/controllers/alunos';
import { AlunosServiceImplementation } from 'src/service/alunoServiceImplementation';

export const getStudents = async (app: FastifyInstance) => {
  app.get('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.getAll(request, reply, alunosService);
    reply.send({ result });
  });
};
