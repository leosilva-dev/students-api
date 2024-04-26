import { app } from 'src/server';
import { getStudent } from './getStudent';
import { getStudents } from './getStudents';
import { createStudent } from './createStudent';
import { updateStudent } from './updateStudent';
import { deleteStudent } from './deleteStudent';

export const studentsRoutes = async () => {
  app.register(getStudent);
  app.register(getStudents);
  app.register(createStudent);
  app.register(updateStudent);
  app.register(deleteStudent);
};
