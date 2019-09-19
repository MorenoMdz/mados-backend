'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrioritySchema extends Schema {
  up () {
    this.create('priorities', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.string('title').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('priorities')
  }
}

module.exports = PrioritySchema
