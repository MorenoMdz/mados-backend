

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPhoneToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('phone');
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('phone');
    });
  }
}

module.exports = AddPhoneToUserSchema;
