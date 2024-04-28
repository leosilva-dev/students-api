import { studentsController } from 'src/controllers/students';
import { StudentRepositoryMock } from 'src/repositories/StudentRepositoryMock';
import { createStudent } from 'src/utils/createStudent';

describe('create student', () => {
  it('should create a student with valid parameters.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    const fakeStudent = createStudent();
    const result = await studentsController.create(fakeStudent, repositoryMock);

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('string');
  });

  it('should not create a student with invalid parameters and return errors messages.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    const fakeStudent = createStudent({ name: '', email: '', cpf: '', ra: '' });

    let error: any;

    try {
      await studentsController.create(fakeStudent, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Campo nome é obrigatório e deve ter pelo menos 3 caracteres.');
    expect(error.message).toContain('Campo email é obrigatório e deve ser um e-mail válido.');
    expect(error.message).toContain('Campo cpf é obrigatório e deve ter 11 caracteres.');
    expect(error.message).toContain('Campo ra é obrigatório e deve ter 6 caracteres.');
  });
});
