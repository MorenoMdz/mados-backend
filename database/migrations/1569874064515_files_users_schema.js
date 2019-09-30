/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FilesUsersSchema extends Schema {
  up() {
    this.create('files_users', table => {
      table.increments();
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('cascade')
        .onDelete('set null');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('set null');
      table.timestamps();
    });
  }

  down() {
    this.drop('files_users');
  }
}

module.exports = FilesUsersSchema;
