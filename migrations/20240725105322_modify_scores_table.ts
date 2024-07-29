import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Add the column with default value
    await knex.schema.table('scores', (table) => {
      table.integer('is_deleted').defaultTo(0).notNullable();
    });
  
    // Add the check constraint using raw SQL
    await knex.raw('ALTER TABLE scores ADD CONSTRAINT check_is_deleted CHECK (is_deleted IN (0, 1))');
  }
  
  export async function down(knex: Knex): Promise<void> {
    // Drop the check constraint using raw SQL
    await knex.raw('ALTER TABLE scores DROP CONSTRAINT check_is_deleted');
  
    // Remove the column if needed
    await knex.schema.table('scores', (table) => {
      table.dropColumn('is_deleted');
    });
  }

