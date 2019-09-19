'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OsStatusSchema extends Schema {
  up () {
    this.create('os_statuses', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('os_statuses')
  }
}

module.exports = OsStatusSchema
