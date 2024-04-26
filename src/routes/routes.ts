import { app } from 'src/server';
import { studentsRoutes } from './students/students.routes';

export const routes = async () => {
  app.register(studentsRoutes);
};
