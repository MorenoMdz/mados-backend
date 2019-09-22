

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemSchema extends Schema {
  up () {
    this.create('systems', (table) => {
      table.increments()
      table.integer('creator_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null')
      table.boolean('active')
      table.integer('owner_id')
      table.integer('subscription_id')
      table.string('name')
      table.text('information')
      table.text('obs')
      table.timestamps()
    })
  }

  down () {
    this.drop('systems')
  }
}

module.exports = SystemSchema
