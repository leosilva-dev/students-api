import { faker } from '@faker-js/faker';
import { studentsController } from 'src/controllers/students';
import { StudentRepositoryMock } from 'src/repositories/StudentRepositoryMock';
import { createStudent } from 'src/utils/createStudent';

describe('UpdateById Students', () => {
  it('should update name and email from a student with valid parameters.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);
    const updatedData = {
      name: 'Updated Name',
      email: 'updatedemail@example.com',
    };

    const result = await studentsController.updateById({ id: fakeStudent.id }, updatedData, repositoryMock);
    expect(result).toEqual(expect.objectContaining(updatedData));
  });

  it('should not update name and email from a student with invalid parameters and return error messages.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);

    const updatedData = {
      name: '',
      email: 'invalidemail',
    };

    let error: any;

    try {
      await studentsController.updateById({ id: fakeStudent.id }, updatedData, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Campo nome é obrigatório e deve ter pelo menos 3 caracteres.');
    expect(error.message).toContain('Campo email é obrigatório e deve ser um e-mail válido.');
  });

  it('should throw error if student id is invalid.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    const updatedData = {
      name: 'Updated Name',
      email: 'updatedemail@example.com',
    };

    let error: any;

    try {
      await studentsController.updateById({ id: 'invalid-id' }, updatedData, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Aluno não encontrado.');
  });

  it('should throw error if student id is not received.', async () => {
    const repositoryMock = new StudentRepositoryMock();
    const updatedData = {
      name: 'Updated Name',
      email: 'updatedemail@example.com',
    };

    let error: any;

    try {
      await studentsController.updateById({ id: '' }, updatedData, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('É preciso informar um id para buscar um aluno.');
  });

  it('should throw error if user try update cpf or ra from a student.', async () => {
    const fakeStudent = createStudent();
    const repositoryMock = new StudentRepositoryMock([{ ...fakeStudent }]);

    const updatedData = {
      name: fakeStudent.name,
      email: fakeStudent.email,
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      ra: faker.number.int({ min: 100000, max: 999999 }).toString(),
    };

    let error: any;

    try {
      await studentsController.updateById({ id: fakeStudent.id }, updatedData, repositoryMock);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Campo cpf não é editável.');
    expect(error.message).toContain('Campo ra não é editável.');
  });
});
