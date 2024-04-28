import { IStudentRepository } from 'src/repositories/IStudentRepository';
import z from 'zod';

export interface IGetByIdParams {
  id: string;
}

export const getById = async (params: IGetByIdParams, StudentRepository: IStudentRepository) => {
  try {
    const idSchema = z.object({
      id: z.string().min(1, 'É preciso informar um id para buscar um aluno.'),
    });

    const validationResult = await idSchema.safeParse(params);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map((error) => error.message).join(' ');
      throw new Error(errorMessage);
    }

    const { id } = validationResult.data;
    const result = await StudentRepository.getById(id);

    if (!result || result instanceof Error) {
      throw new Error(result?.message || 'Não há alunos com esse id.');
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
