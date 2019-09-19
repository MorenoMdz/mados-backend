'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepairSchema extends Schema {
  up () {
    this.create('repairs', (table) => {
      table.increments()
      table.integer('repair_creator_id')
      table.string('repair_title')
      table.string('repair_description')
      table.string('repair_obs')
      table.timestamps()
    })
  }

  down () {
    this.drop('repairs')
  }
}

module.exports = RepairSchema
