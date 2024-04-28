import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { IGetByIdParams } from 'src/controllers/students/getById';
import { StudentRepository } from 'src/repositories/StudentRepository';

export const getStudent = async (app: FastifyInstance) => {
  app.get('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.params as IGetByIdParams;
      const repository = new StudentRepository();
      const result = await studentsController.getById(params, repository);
      reply.send({ result });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  });
};
