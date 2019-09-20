'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreOwnerIdSchema extends Schema {
  up () {
    this.table('stores', (table) => {
      // alter table
      table.integer('owner_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null').alter()
    })
  }

  down () {
    this.table('stores', (table) => {
      // reverse alternations
      table.dropColumn('owner_id').alter()
    })
  }
}

module.exports = StoreOwnerIdSchema
