'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.integer('store_id').unsigned().references('id').inTable('stores').onUpdate('cascade').onDelete('set null')
      table.integer('client_id').unsigned().references('id').inTable('clients').onUpdate('cascade').onDelete('set null')
      table.integer('system_id').unsigned().references('id').inTable('systems').onUpdate('cascade').onDelete('set null')
      table.string('street')
      table.integer('number')
      table.string('district')
      table.string('complement')
      table.string('city')
      table.string('state')
      table.string('country')
      table.string('zip')
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
