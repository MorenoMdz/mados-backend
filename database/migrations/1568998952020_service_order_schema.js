'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSchema extends Schema {
  up () {
    this.create('service_orders', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.integer('client_id').unsigned().references('id').inTable('clients').onUpdate('cascade').onDelete('set null')
      table.integer('store_id').unsigned().references('id').inTable('stores').onUpdate('cascade').onDelete('set null')

      table.integer('equipment_id').unsigned().references('id').inTable('equipment').onUpdate('cascade').onDelete('set null')
      table.string('serial_number').notNullable()
      table.string('equipment_model')
      table.text('accessories')

      table.string('os_number').notNullable()
      // table.string('priority').notNullable()
      table.integer('priority_id').unsigned().references('id').inTable('priorities').onUpdate('cascade').onDelete('set null')
      table.string('os_type').notNullable()
      // table.string('service_order_status')
      table.integer('os_status_id').unsigned().references('id').inTable('os_statuses').onUpdate('cascade').onDelete('set null')

      // table.string('diagnostic_status')
      table.integer('diag_statuses_id').unsigned().references('id').inTable('diag_statuses').onUpdate('cascade').onDelete('set null')
      table.text('problem_description')
      // table.string('repair_status')
      table.integer('repair_status_id').unsigned().references('id').inTable('repair_statuses').onUpdate('cascade').onDelete('set null')
      table.text('observation')

      // table.string('payment_status')
      table.integer('payment_status_id').unsigned().references('id').inTable('payment_statuses').onUpdate('cascade').onDelete('set null')
      table.string('payment_type')
      table.integer('paid_value')

      table.timestamp('delivery_date')
      table.string('warranty')
      table.string('received_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_orders')
  }
}

module.exports = ServiceOrderSchema
