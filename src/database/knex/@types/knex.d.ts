import { IStudent } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    students: IStudent;
  }
}
