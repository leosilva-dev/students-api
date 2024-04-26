import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { alunosController } from 'src/controllers/alunos';
import { AlunosServiceImplementation } from 'src/service/alunoServiceImplementation';

export const createStudent = async (app: FastifyInstance) => {
  app.post('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.create(request, reply, alunosService);
    reply.send({ result });
  });
};
