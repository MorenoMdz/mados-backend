/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterOwnerIdFieldToSystemSchema extends Schema {
  up() {
    this.table('diagnostics', table => {
      // alter table
      table.integer('creator_id').alter();
      table.string('title').alter();
      table.string('description').alter();
      table.string('obs').alter();
    });
  }

  down() {
    this.table('diagnostics', table => {
      // reverse alternations
      table.integer('diag_creator_id').alter();
      table.string('diag_title').alter();
      table.string('diag_description').alter();
      table.string('diag_obs').alter();
    });
  }
}

module.exports = AlterOwnerIdFieldToSystemSchema;
