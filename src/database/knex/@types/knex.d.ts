import { IAluno } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    aluno: IAluno;
  }
}
