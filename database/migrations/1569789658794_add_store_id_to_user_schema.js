/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddStoreIdToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      // alter table
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('cascade')
        .onDelete('set null');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
      table.dropColumn('store_id');
    });
  }
}

module.exports = AddStoreIdToUserSchema;
