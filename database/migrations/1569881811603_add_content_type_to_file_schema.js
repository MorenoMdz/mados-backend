/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddContentTypeToFileSchema extends Schema {
  up() {
    this.table('files', table => {
      // alter table
      table.string('content_type');
    });
  }

  down() {
    this.table('files', table => {
      // reverse alternations
      table.dropColumn('content_type');
    });
  }
}

module.exports = AddContentTypeToFileSchema;
