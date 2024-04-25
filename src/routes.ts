import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { alunosController } from './controllers/alunos';
import { AlunosServiceImplementation } from './service/alunoServiceImplementation';

export default async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.getAll(request, reply, alunosService);
    reply.send({ result });
  });

  fastify.get('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.getById(request, reply, alunosService);
    reply.send({ result });
  });

  fastify.post('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.create(request, reply, alunosService);
    reply.send({ result });
  });

  fastify.delete('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.deleteById(request, reply, alunosService);
    reply.send({ result });
  });

  fastify.put('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const alunosService = new AlunosServiceImplementation();
    const result = await alunosController.updateById(request, reply, alunosService);
    reply.send({ result });
  });
}
