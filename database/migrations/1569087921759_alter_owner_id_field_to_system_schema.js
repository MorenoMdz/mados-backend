

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterOwnerIdFieldToSystemSchema extends Schema {
  up () {
    this.table('systems', (table) => {
      // alter table
      table.integer('owner_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('set null').alter()
    })
  }

  down () {
    this.table('systems', (table) => {
      // reverse alternations
      table.integer('owner_id').alter()
    })
  }
}

module.exports = AlterOwnerIdFieldToSystemSchema
