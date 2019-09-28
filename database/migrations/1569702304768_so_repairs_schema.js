

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoRepairsSchema extends Schema {
  up() {
    this.create('so_repairs', table => {
      table.increments();
      table
        .integer('service_order_id')
        .unsigned()
        .references('id')
        .inTable('service_orders')
        .onUpdate('cascade')
        .onDelete('set null');
      table
        .integer('repair_id')
        .unsigned()
        .references('id')
        .inTable('diagnostics')
        .onUpdate('cascade')
        .onDelete('set null');
      table.timestamps();
    });
  }

  down() {
    this.drop('so_repairs');
  }
}

module.exports = SoRepairsSchema;
