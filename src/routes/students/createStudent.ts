import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { ICreateParams } from 'src/controllers/students/create';
import { StudentRepository } from 'src/repositories/StudentRepository';

export const createStudent = async (app: FastifyInstance) => {
  app.post('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.body as ICreateParams;
      const repository = new StudentRepository();
      const result = await studentsController.create(params, repository);
      reply.send({ result });
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });
};
