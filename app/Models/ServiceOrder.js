/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ServiceOrder extends Model {
  static boot() {
    super.boot();
    // error on test, can't load the store data
    // this.addHook('afterCreate', 'serviceOrderUpdateHook.sendServiceOrderEmail');
    this.addHook(
      'beforeUpdate',
      'serviceOrderUpdateHook.sendServiceOrderEmail'
    );
  }

  creator() {
    return this.belongsTo('App/Models/User', 'creator_id', 'id');
  }

  client() {
    return this.belongsTo('App/Models/Client', 'client_id', 'id');
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id', 'id');
  }

  equipment() {
    return this.hasOne('App/Models/Equipment', 'equipment_id', 'id');
  }

  priority() {
    return this.hasOne('App/Models/Priority', 'priority_id', 'id');
  }

  osStatus() {
    return this.hasOne('App/Models/OsStatus', 'os_status_id', 'id');
  }

  diagStatus() {
    return this.hasOne('App/Models/DiagStatus', 'diag_status_id', 'id');
  }

  repairStatus() {
    return this.hasOne('App/Models/RepairStatus', 'repair_status_id', 'id');
  }

  paymentStatus() {
    return this.hasOne('App/Models/PaymentStatus', 'payment_status_id', 'id');
  }

  // TODO
  // OS to Diagnostics
  diagnostics() {
    return this.belongsToMany('App/Models/Diagnostic').pivotTable(
      'so_diagnostics'
    );
  }
  // OS to Repairs
}

module.exports = ServiceOrder;
