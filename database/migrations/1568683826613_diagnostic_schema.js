'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiagnosticSchema extends Schema {
  up () {
    this.create('diagnostics', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.integer('diag_creator_id')
      table.string('diag_title')
      table.string('diag_description')
      table.string('diag_obs')
      table.timestamps()
    })
  }

  down () {
    this.drop('diagnostics')
  }
}

module.exports = DiagnosticSchema
