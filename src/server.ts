import fastify from 'fastify';

const app = fastify();

app.get('/', (request, reply) => {
  return reply.status(200).send({ message: 'hello world' });
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running!');
});
