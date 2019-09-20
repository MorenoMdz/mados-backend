'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepairCreatorIdSchema extends Schema {
  up () {
    this.table('repairs', (table) => {
      // alter table
      table.integer('repair_creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null').alter()
      table.renameColumn('repair_creator_id', 'creator_id')
      table.renameColumn('repair_title', 'title')
      table.renameColumn('repair_description', 'description')
      table.renameColumn('repair_obs', 'obs')
    })
  }

  down () {
    this.table('repairs', (table) => {
      // reverse alternations
      table.integer('creator_id').alter()
      table.renameColumn('creator_id', 'repair_creator_id')
      table.renameColumn('title', 'repair_title')
      table.renameColumn('description', 'repair_description')
      table.renameColumn('obs', 'repair_obs')
    })
  }
}

module.exports = RepairCreatorIdSchema
