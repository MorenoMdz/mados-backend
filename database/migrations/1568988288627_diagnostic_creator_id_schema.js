'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiagnosticCreatorSchema extends Schema {
  up () {
    this.table('diagnostics', (table) => {
      // alter table
      table.integer('diag_creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null').alter()
    })
  }

  down () {
    this.table('diagnostics', (table) => {
      // reverse alternations
      table.integer('diag_creator_id').alter()
    })
  }
}

module.exports = DiagnosticCreatorSchema
