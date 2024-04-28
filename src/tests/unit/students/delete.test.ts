import { studentsController } from 'src/controllers/students';
import { StudentRepositoryMock } from 'src/repositories/StudentRepositoryMock';
import { createStudent } from 'src/utils/createStudent';

describe('Delete student', () => {
  it('should delete a student with valid id.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);

    const result = await studentsController.deleteById({ id: fakeStudent.id }, repositoryMock);

    expect(result).toBe('Aluno excluído com sucesso.');
  });

  it('should not delete a student with invalid id.', async () => {
    const repositoryMock = new StudentRepositoryMock();

    let error: any;

    try {
      await studentsController.deleteById({ id: '' }, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('É preciso informar um id para excluir um aluno.');
  });

  it('should handle errors thrown by the repository.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    repositoryMock.deleteById = jest.fn().mockResolvedValue(null);

    const result = await studentsController.deleteById({ id: '1' }, repositoryMock);

    expect(result).toEqual('Erro ao excluir aluno.');
  });
});
