/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddFilesIdToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      // alter table
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
      table.dropColumn('file_id');
    });
  }
}

module.exports = AddFilesIdToUserSchema;
