import { studentsProvider } from 'src/providers/students/studentsProvider';
import { IStudentRepository } from './IStudentRepository';
import { IStudent } from 'src/database/models';

export class StudentRepository implements IStudentRepository {
  async getById(id: string): Promise<IStudent | undefined | Error> {
    return studentsProvider.getById(id);
  }

  async getAll(): Promise<IStudent[] | Error> {
    return studentsProvider.getAll();
  }

  async create(studentData: Omit<IStudent, 'id'>): Promise<string | Error> {
    return studentsProvider.create(studentData);
  }

  async updateById(id: string, updateData: IStudent): Promise<IStudent | Error> {
    return studentsProvider.updateById(id, updateData);
  }

  async deleteById(id: string): Promise<boolean | Error> {
    return studentsProvider.deleteById(id);
  }
}
