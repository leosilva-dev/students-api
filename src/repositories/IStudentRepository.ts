import { IStudent } from 'src/database/models';

export interface IStudentRepository {
  getById(id: string): Promise<IStudent | undefined | Error>;
  getAll(): Promise<IStudent[] | Error>;
  create(studentData: Omit<IStudent, 'id'>): Promise<string | Error>;
  updateById(id: string, updateData: Omit<IStudent, 'id' | 'cpf' | 'ra'>): Promise<IStudent | Error>;
  deleteById(id: string): Promise<boolean | Error>;
}
