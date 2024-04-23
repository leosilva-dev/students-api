import { Knex } from 'src/database/knex/connection';
import { ETableNames } from 'src/database/ETableNames';
import { IAluno } from 'src/database/models';

const findById = async (id: string): Promise<IAluno | undefined | Error> => {
  try {
    const result = await Knex(ETableNames.aluno).where({ id }).first();
    return result;
  } catch (error) {
    return new Error('Erro ao buscar aluno.');
  }
};

const findMany = async (): Promise<IAluno[] | Error> => {
  try {
    return Knex(ETableNames.aluno).select('*');
  } catch (error) {
    return new Error('Erro ao buscar alunos.');
  }
};

const create = async (alunoData: Omit<IAluno, 'id'>): Promise<Pick<IAluno, 'id'> | Error> => {
  try {
    const [result] = await Knex(ETableNames.aluno).insert(alunoData).returning('id');

    if (typeof result === 'object') {
      return result.id;
    }

    return new Error('Erro ao cadastrar aluno.');
  } catch (error) {
    return new Error('Erro ao cadastrar aluno.');
  }
};

const updateById = async (id: string, updateData: IAluno): Promise<IAluno | Error> => {
  try {
    const result = await Knex(ETableNames.aluno).where({ id }).update(updateData).returning('*');
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
    const result = await Knex(ETableNames.aluno).where({ id }).del();
    return result === 1 ? true : false;
  } catch (error) {
    return new Error('Erro ao excluir aluno.');
  }
};

export const alunosProvider = {
  findById,
  findMany,
  create,
  updateById,
  deleteById,
};
