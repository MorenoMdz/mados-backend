

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPaymentDateToServiceOrderSchema extends Schema {
  up() {
    this.table('service_orders', table => {
      table.timestamp('payment_date');
    });
  }

  down() {
    this.table('service_orders', table => {
      table.dropColumn('payment_date');
    });
  }
}

module.exports = AddPaymentDateToServiceOrderSchema;
