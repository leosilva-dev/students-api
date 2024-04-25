import { IAluno } from 'src/database/models';

export interface AlunosService {
  getById(id: string): Promise<IAluno | undefined | Error>;
  getAll(): Promise<IAluno[] | Error>;
  create(alunoData: Omit<IAluno, 'id'>): Promise<Pick<IAluno, 'id'> | Error>;
  updateById(id: string, updateData: IAluno): Promise<IAluno | Error>;
  deleteById(id: string): Promise<boolean | Error>;
}
