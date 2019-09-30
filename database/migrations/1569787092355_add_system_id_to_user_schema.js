

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddSystemIdToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      // alter table
      table
        .integer('system_id')
        .unsigned()
        .references('id')
        .inTable('systems')
        .onUpdate('cascade')
        .onDelete('set null');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
      table.dropColumn('system_id');
    });
  }
}

module.exports = AddSystemIdToUserSchema;
