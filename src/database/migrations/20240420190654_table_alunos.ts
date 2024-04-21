import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(ETableNames.aluno, (table) => {
    table.increments('id').primary(),
      table.string('name').notNullable(),
      table.string('email').notNullable().unique(),
      table.string('cpf').notNullable().unique(),
      table.string('ra').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists(ETableNames.aluno);
}
