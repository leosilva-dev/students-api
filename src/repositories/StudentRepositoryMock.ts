import { IStudentRepository } from './IStudentRepository';
import { IStudent } from 'src/database/models';

export class StudentRepositoryMock implements IStudentRepository {
  private students: IStudent[] = [];

  constructor(initialStudents: IStudent[] = []) {
    this.students = initialStudents;
  }

  async getById(id: string): Promise<IStudent | undefined | Error> {
    const student = this.students.find((student) => student.id === id);
    if (student) {
      return student;
    } else {
      return undefined;
    }
  }

  async getAll(): Promise<IStudent[] | Error> {
    return this.students;
  }

  async create(studentData: Omit<IStudent, 'id'>): Promise<string | Error> {
    const id = Math.random().toString(36).substr(2, 9);
    const newStudent = { ...studentData, id };
    this.students.push(newStudent);
    return id;
  }

  async updateById(id: string, updateData: IStudent): Promise<IStudent | Error> {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students[index] = { ...updateData, id };
      return this.students[index];
    } else {
      throw new Error('Aluno não encontrado.');
    }
  }

  async deleteById(id: string): Promise<boolean | Error> {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    } else {
      throw new Error('Aluno não encontrado.');
    }
  }
}
