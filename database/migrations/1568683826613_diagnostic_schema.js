/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DiagnosticSchema extends Schema {
  up() {
    this.create('diagnostics', table => {
      table.increments();
      table
        .integer('creator_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('set null');
      table.integer('creator_id');
      table.string('title');
      table.string('description');
      table.string('obs');
      table.timestamps();
    });
  }

  down() {
    this.drop('diagnostics');
  }
}

module.exports = DiagnosticSchema;
