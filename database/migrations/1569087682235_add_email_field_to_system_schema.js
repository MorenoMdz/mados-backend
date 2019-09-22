

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEmailFieldToSystemSchema extends Schema {
  up () {
    this.table('systems', (table) => {
      // alter table
      table.string('email')
    })
  }

  down () {
    this.table('systems', (table) => {
      // reverse alternations
      table.dropColumn('email')
    })
  }
}

module.exports = AddEmailFieldToSystemSchema
