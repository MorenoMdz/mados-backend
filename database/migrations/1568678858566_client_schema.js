'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.boolean('active').notNullable()
      table.string('name').notNullable()
      table.string('last_name').notNullable()
      table.string('cpf')
      table.enu('gender', ['M', 'F']).notNullable()
      table.string('email')
      table.string('phone1')
      table.string('phone2')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
