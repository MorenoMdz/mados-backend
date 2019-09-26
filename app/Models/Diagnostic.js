/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Diagnostic extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  serviceOrder() {
    return this.belongsToMany('App/Models/ServiceOrder').pivotTable(
      'so_diagnostics'
    );
  }
}

module.exports = Diagnostic;
