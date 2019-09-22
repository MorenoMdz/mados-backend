

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class System extends Model {
  creator () {
    return this.belongsTo('App/Models/User', 'creator_id', 'id')
  }

  owner () {
    return this.belongsTo('App/Models/User', 'owner_id', 'id')
  }
}

module.exports = System
