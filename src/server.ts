import 'dotenv/config';
import fastify from 'fastify';
import routes from './routes';

const app = fastify();

app.register(routes);

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333 🔥');
});
