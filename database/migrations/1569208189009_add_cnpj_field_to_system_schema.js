/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCnpjFieldToSystemSchema extends Schema {
  up() {
    this.table('systems', table => {
      // alter table
      table.string('cnpj');
    });
  }

  down() {
    this.table('systems', table => {
      // reverse alternations
      table.dropColumn('cnpj');
    });
  }
}

module.exports = AddCnpjFieldToSystemSchema;
