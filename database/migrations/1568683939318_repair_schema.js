

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepairSchema extends Schema {
  up () {
    this.create('repairs', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.string('title')
      table.string('description')
      table.string('obs')
      table.timestamps()
    })
  }

  down () {
    this.drop('repairs')
  }
}

module.exports = RepairSchema
