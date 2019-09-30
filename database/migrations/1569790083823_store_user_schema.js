/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StoreUserSchema extends Schema {
  up() {
    this.create('store_users', table => {
      table.increments();
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
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
    this.drop('store_users');
  }
}

module.exports = StoreUserSchema;
