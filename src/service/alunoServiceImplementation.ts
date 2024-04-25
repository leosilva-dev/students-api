import { alunosProvider } from 'src/providers/alunos/alunosProvider';
import { AlunosService } from './alunoService';
import { IAluno } from 'src/database/models';

export class AlunosServiceImplementation implements AlunosService {
  async getById(id: string): Promise<IAluno | undefined | Error> {
    return alunosProvider.getById(id);
  }

  async getAll(): Promise<IAluno[] | Error> {
    return alunosProvider.getAll();
  }

  async create(alunoData: Omit<IAluno, 'id'>): Promise<Pick<IAluno, 'id'> | Error> {
    return alunosProvider.create(alunoData);
  }

  async updateById(id: string, updateData: IAluno): Promise<IAluno | Error> {
    return alunosProvider.updateById(id, updateData);
  }

  async deleteById(id: string): Promise<boolean | Error> {
    return alunosProvider.deleteById(id);
  }
}
