'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreCreatorIdSchema extends Schema {
  up () {
    this.table('stores', (table) => {
      // alter table
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
    })
  }

  down () {
    this.table('stores', (table) => {
      // reverse alternations
      table.dropColumn('creator_id')
    })
  }
}

module.exports = StoreCreatorIdSchema
