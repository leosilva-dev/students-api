import { FastifyInstance, FastifyReply } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { StudentRepository } from 'src/repositories/StudentRepository';

export const getStudents = async (app: FastifyInstance) => {
  app.get('/alunos', async (_, reply: FastifyReply) => {
    try {
      const repository = new StudentRepository();
      const result = await studentsController.getAll(repository);
      reply.send(result);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  });
};
