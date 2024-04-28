import { IStudentRepository } from 'src/repositories/IStudentRepository';
import z from 'zod';

export interface ICreateParams {
  name: string;
  email: string;
  cpf: string;
  ra: string;
}

export const create = async (params: ICreateParams, StudentRepository: IStudentRepository) => {
  try {
    const studentSchema = z.object({
      name: z.string().min(3, 'Campo nome é obrigatório e deve ter pelo menos 3 caracteres.'),
      email: z.string().email('Campo email é obrigatório e deve ser um e-mail válido.'),
      cpf: z.string().length(11, 'Campo cpf é obrigatório e deve ter 11 caracteres.'),
      ra: z.string().min(6, 'Campo ra é obrigatório e deve ter 6 caracteres.'),
    });

    const validationResult = await studentSchema.safeParse(params);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map((error) => error.message).join(' ');
      throw new Error(errorMessage);
    }

    const newStudent = validationResult.data;
    const result = await StudentRepository.create(newStudent);

    if (result instanceof Error) {
      throw new Error(result?.message || 'Não há alunos com esse id.');
    }

    return { id: result };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
