'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.integer('owner_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.boolean('active').notNullable()
      table.string('name').notNullable()
      table.string('cnpj')
      table.string('email').notNullable()
      table.string('phone1').notNullable()
      table.string('phone2').notNullable()
      table.string('vip_level')
      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
