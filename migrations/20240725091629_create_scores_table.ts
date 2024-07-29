import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("scores", (table) => {
      table.increments("id").primary();
      table.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.integer("gameId").unsigned().references("id").inTable("games").onDelete("CASCADE");
      table.integer("score").notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("scores");
  }