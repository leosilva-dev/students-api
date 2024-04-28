import { Knex } from 'src/database/knex/connection';
import { ETableNames } from 'src/database/ETableNames';
import { IStudent } from 'src/database/models';

const getById = async (id: string): Promise<IStudent | undefined | Error> => {
  try {
    const result = await Knex(ETableNames.students).where({ id }).first();
    return result;
  } catch (error) {
    return new Error('Erro ao buscar aluno.');
  }
};

const getAll = async (): Promise<IStudent[] | Error> => {
  try {
    return Knex(ETableNames.students).select('id', 'name', 'email', 'cpf', 'ra');
  } catch (error) {
    return new Error('Erro ao buscar alunos.');
  }
};

const create = async (studentData: Omit<IStudent, 'id'>): Promise<string | Error> => {
  try {
    const [result] = await Knex(ETableNames.students).insert(studentData).returning('id');

    if (typeof result === 'object') {
      return result.id;
    }

    return new Error('Erro ao cadastrar aluno.');
  } catch (error) {
    return new Error('Erro ao cadastrar aluno.');
  }
};

const updateById = async (id: string, updateData: IStudent): Promise<IStudent | Error> => {
  try {
    const result = await Knex(ETableNames.students)
      .where({ id })
      .update(updateData)
      .returning(['id', 'name', 'email', 'cpf', 'ra']);

    if (result[0] === undefined) {
      return new Error('Erro ao editar aluno.');
    }
    return result[0];
  } catch (error) {
    return new Error('Erro ao editar aluno.');
  }
};

const deleteById = async (id: string): Promise<boolean | Error> => {
  try {
    const result = await Knex(ETableNames.students).where({ id }).del();
    return result === 1 ? true : false;
  } catch (error) {
    return new Error('Erro ao excluir aluno.');
  }
};

export const studentsProvider = {
  getById,
  getAll,
  create,
  updateById,
  deleteById,
};
