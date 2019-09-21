'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDiagStatusFieldToServiceOrderSchema extends Schema {
  up () {
    this.table('service_orders', (table) => {
      // alter table
      table.renameColumn('diag_statuses_id', 'diag_status_id')
    })
  }

  down () {
    this.table('service_orders', (table) => {
      // reverse alternations
      table.renameColumn('diag_status_id', 'diag_statuses_id')
    })
  }
}

module.exports = AlterDiagStatusFieldToServiceOrderSchema
