'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiagStatusSchema extends Schema {
  up () {
    this.create('diag_statuses', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('diag_statuses')
  }
}

module.exports = DiagStatusSchema
