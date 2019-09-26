

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoDiagnosticsSchema extends Schema {
  up() {
    this.create('so_diagnostics', table => {
      table.increments();
      table
        .integer('service_order_id')
        .unsigned()
        .references('id')
        .inTable('service_orders')
        .onUpdate('cascade')
        .onDelete('set null');
      table
        .integer('diagnostic_id')
        .unsigned()
        .references('id')
        .inTable('diagnostics')
        .onUpdate('cascade')
        .onDelete('set null');
      table.timestamps();
    });
  }

  down() {
    this.drop('so_diagnostics');
  }
}

module.exports = SoDiagnosticsSchema;
