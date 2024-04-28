import { IStudentRepository } from 'src/repositories/IStudentRepository';

export const getAll = async (StudentRepository: IStudentRepository) => {
  try {
    const result = await StudentRepository.getAll();

    if (!result || result instanceof Error) {
      throw new Error(result?.message || 'Não há alunos.');
    }

    const resultOrderedByName = result.sort((a, b) => a.name.localeCompare(b.name));
    return resultOrderedByName;
  } catch (error) {
    throw new Error('Erro ao obter recursos.');
  }
};
