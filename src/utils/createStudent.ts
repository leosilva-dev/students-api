import { faker } from '@faker-js/faker';
import { IStudent } from 'src/database/models';

interface IStudentOptions {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
  ra?: string;
}

export const createStudent = (defaultData?: IStudentOptions): IStudent => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    email: faker.internet.email(),
    ra: faker.number.int({ min: 100000, max: 999999 }).toString(),
    ...defaultData,
  };
};
