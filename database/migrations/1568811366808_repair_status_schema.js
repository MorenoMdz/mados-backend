'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepairStatusSchema extends Schema {
  up () {
    this.create('repair_statuses', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('repair_statuses')
  }
}

module.exports = RepairStatusSchema
