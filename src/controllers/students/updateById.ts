import { IStudentRepository } from 'src/repositories/IStudentRepository';
import z from 'zod';

export interface IUpdateParamsId {
  id: string;
}
export interface IUpdateParams {
  name: string;
  email: string;
  cpf?: string;
  ra?: string;
}

export const updateById = async (
  studentId: IUpdateParamsId,
  params: IUpdateParams,
  StudentRepository: IStudentRepository,
) => {
  try {
    const studentSchema = z.object({
      name: z.string().min(1, 'Campo nome é obrigatório e deve ter pelo menos 3 caracteres.'),
      email: z.string().email('Campo email é obrigatório e deve ser um e-mail válido.'),
      cpf: z
        .string()
        .optional()
        .refine((value) => value === undefined, { message: 'Campo cpf não é editável.' }),
      ra: z
        .string()
        .optional()
        .refine((value) => value === undefined, { message: 'Campo ra não é editável.' }),
    });

    const idSchema = z.object({
      id: z.string().min(1, 'É preciso informar um id para buscar um aluno.'),
    });

    const validationResultParams = await studentSchema.safeParse(params);
    const validationResultId = await idSchema.safeParse(studentId);

    if (!validationResultParams.success) {
      const errorMessage = validationResultParams.error.errors.map((error) => error.message).join(' ');
      throw new Error(errorMessage);
    }

    if (!validationResultId.success) {
      const errorMessage = validationResultId.error.errors.map((error) => error.message).join(' ');
      throw new Error(errorMessage);
    }

    const { id } = validationResultId.data;
    const newStudent = validationResultParams.data;

    const result = await StudentRepository.updateById(id, newStudent);

    if (result instanceof Error) {
      throw new Error(result?.message || 'Aluno não encontrado.');
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
