/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Store extends Model {
  creator() {
    return this.belongsTo('App/Models/User', 'creator_id', 'id');
  }

  serviceOrder() {
    return this.hasMany('App/Models/ServiceOrder');
  }

  address() {
    return this.hasOne('App/Models/Address');
  }

  users() {
    return this.belongsToMany('App/Models/User');
  }
}

module.exports = Store;
