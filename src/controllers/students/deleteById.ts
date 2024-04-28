import { IStudentRepository } from 'src/repositories/IStudentRepository';
import z from 'zod';

export interface IDeleteParams {
  id: string;
}

export const deleteById = async (params: IDeleteParams, StudentRepository: IStudentRepository) => {
  try {
    const idSchema = z.object({
      id: z.string().min(1, 'É preciso informar um id para excluir um aluno.'),
    });

    const validationResult = await idSchema.safeParse(params);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map((error) => error.message).join(' ');
      throw new Error(errorMessage);
    }

    const { id } = validationResult.data;
    const result = await StudentRepository.deleteById(id);

    const message = result ? 'Aluno excluído com sucesso.' : 'Erro ao excluir aluno.';

    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
