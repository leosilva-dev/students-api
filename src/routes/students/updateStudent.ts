import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { alunosController } from 'src/controllers/alunos';
import { AlunosServiceImplementation } from 'src/service/alunoServiceImplementation';

export const updateStudent = async (app: FastifyInstance) => {
  app.put('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.updateById(request, reply, alunosService);
    reply.send({ result });
  });
};
