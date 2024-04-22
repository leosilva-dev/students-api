import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

type RouteHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

interface RouteOptions {
  handler: RouteHandler;
}

export default async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', async (request, reply) => {
    reply.send({ message: 'Olá, mundo!' });
  });
}
