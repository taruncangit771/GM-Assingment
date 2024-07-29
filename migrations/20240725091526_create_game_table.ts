import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("games", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("genre").notNullable();
      table.date("releaseDate").notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("games");
  }

