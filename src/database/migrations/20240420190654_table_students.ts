import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  await knex.schema.createTable(ETableNames.students, (table) => {
    table.increments('id').primary(),
      table.string('name').notNullable(),
      table.string('email').notNullable().unique(),
      table.string('cpf').notNullable().unique(),
      table.string('ra').notNullable().unique(),
      table.timestamp('created_at').defaultTo(knex.fn.now()),
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.raw(`
  CREATE OR REPLACE FUNCTION set_created_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.created_at = COALESCE(NEW.created_at, CURRENT_TIMESTAMP);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`);

  await knex.raw(`
  CREATE TRIGGER set_created_at_trigger
  BEFORE INSERT ON ${ETableNames.students}
  FOR EACH ROW
  EXECUTE FUNCTION set_created_at();
`);

  await knex.raw(`
  CREATE OR REPLACE FUNCTION set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`);

  await knex.raw(`
  CREATE TRIGGER set_updated_at_trigger
  BEFORE UPDATE ON ${ETableNames.students}
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
`);
}

export async function down(knex: Knex) {
  knex.schema.dropTableIfExists(ETableNames.students);
}
