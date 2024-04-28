import { studentsController } from 'src/controllers/students';
import { StudentRepositoryMock } from 'src/repositories/StudentRepositoryMock';
import { createStudent } from 'src/utils/createStudent';

describe('getAll students', () => {
  it('should return a list of students.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    const result = await studentsController.getAll(repositoryMock);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an empty list if no students are registered.', async () => {
    const emptyRepositoryMock = new StudentRepositoryMock([]);
    const result = await studentsController.getAll(emptyRepositoryMock);
    expect(result).toEqual([]);
  });

  it('should return a students list with all properties present on IStudent interface.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);
    const result = await studentsController.getAll(repositoryMock);

    if (Array.isArray(result)) {
      result.forEach((student) => {
        expect(student).toHaveProperty('id');
        expect(student).toHaveProperty('name');
        expect(student).toHaveProperty('email');
        expect(student).toHaveProperty('cpf');
        expect(student).toHaveProperty('ra');
      });
    }
  });

  it('should return students ordered by name.', async () => {
    const alice = createStudent({ name: 'Alice' });
    const bob = createStudent({ name: 'Bob' });
    const charlie = createStudent({ name: 'Charlie' });

    const studentsWithoutOrder = [bob, charlie, alice];

    const repositoryMock = new StudentRepositoryMock(studentsWithoutOrder);

    const result = await studentsController.getAll(repositoryMock);

    if (Array.isArray(result)) {
      const sortedStudents = [alice, bob, charlie];
      expect(result).toEqual(sortedStudents);
    }
  });
});
