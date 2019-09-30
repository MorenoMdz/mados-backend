'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SearchServiceOrdersSchema extends Schema {
  up () {
    this.create('search_service_orders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('search_service_orders')
  }
}

module.exports = SearchServiceOrdersSchema
