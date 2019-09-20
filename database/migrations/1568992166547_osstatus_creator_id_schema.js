'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OsstatusCreatorIdSchema extends Schema {
  up () {
    this.table('os_statuses', (table) => {
      // alter table
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
    })
  }

  down () {
    this.table('os_statuses', (table) => {
      // reverse alternations
      table.integer('creator_id')
    })
  }
}

module.exports = OsstatusCreatorIdSchema
