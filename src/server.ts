import fastify from 'fastify';
import database from '../infra/database';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify();

app.get('/', async (request, reply) => {
  const result = await database.query('select 1+1');
  return reply.status(200).send({ message: result });
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333 🔥');
});
