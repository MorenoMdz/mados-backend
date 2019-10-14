/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddAvatarToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('avatar_url');
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('avatar_url');
    });
  }
}

module.exports = AddAvatarToUserSchema;
