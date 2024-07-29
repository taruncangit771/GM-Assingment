import type { Knex } from "knex";


exports.up = function(knex:Knex) {
    return knex.schema.table('games', function(table) {
      table.integer('is_deleted').defaultTo(0);
    }).then(function() {
      return knex.raw('ALTER TABLE games ADD CONSTRAINT is_deleted_check CHECK (is_deleted IN (0, 1));');
    });
  };
  
  exports.down = function(knex:Knex) {
    return knex.raw('ALTER TABLE games DROP CONSTRAINT is_deleted_check')
      .then(function() {
        return knex.schema.table('games', function(table) {
          table.dropColumn('is_deleted');
        });
      });
  };
  

