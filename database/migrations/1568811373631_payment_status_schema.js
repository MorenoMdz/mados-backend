

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentStatusSchema extends Schema {
  up () {
    this.create('payment_statuses', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.string('title').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_statuses')
  }
}

module.exports = PaymentStatusSchema
