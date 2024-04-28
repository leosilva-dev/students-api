import { studentsController } from 'src/controllers/students';
import { StudentRepositoryMock } from 'src/repositories/StudentRepositoryMock';
import { createStudent } from 'src/utils/createStudent';

describe('getById student', () => {
  it('should return a student with the same id received.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([fakeStudent]);
    const result = await studentsController.getById({ id: fakeStudent.id }, repositoryMock);

    expect(result.id).toEqual(fakeStudent.id);
  });

  it('should return a student with all properties present on IStudent interface.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);
    const result = await studentsController.getById({ id: fakeStudent.id }, repositoryMock);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('cpf');
    expect(result).toHaveProperty('ra');

    expect(result.id).toEqual(fakeStudent.id);
    expect(result.name).toEqual(fakeStudent.name);
    expect(result.email).toEqual(fakeStudent.email);
    expect(result.cpf).toEqual(fakeStudent.cpf);
    expect(result.ra).toEqual(fakeStudent.ra);
  });
});
