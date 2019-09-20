'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreAddressSchema extends Schema {
  up () {
    this.table('stores', (table) => {
      // alter table
      table.integer('address_id').unsigned().references('id').inTable('addresses').onUpdate('cascade').onDelete('set null')
    })
  }

  down () {
    this.table('stores', (table) => {
      // reverse alternations
      table.dropColumn('address_id')
    })
  }
}

module.exports = StoreAddressSchema
