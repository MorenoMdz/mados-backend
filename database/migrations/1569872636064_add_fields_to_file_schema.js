/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddFieldsToFileSchema extends Schema {
  up() {
    this.table('files', table => {
      table.string('file_path');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
    });
  }

  down() {
    this.table('files', table => {
      table.dropColumn('file_path');
      table.dropColumn('user_id');
    });
  }
}

module.exports = AddFieldsToFileSchema;
