import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { IUpdateParams, IUpdateParamsId } from 'src/controllers/students/updateById';
import { StudentRepository } from 'src/repositories/StudentRepository';

export const updateStudent = async (app: FastifyInstance) => {
  app.put('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const id = request.params as IUpdateParamsId;
      const body = request.body as IUpdateParams;

      const repository = new StudentRepository();
      const result = await studentsController.updateById(id, body, repository);
      reply.send({ result });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  });
};
