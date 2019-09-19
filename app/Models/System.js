'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class System extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  store () {
    return this.hasMany('App/Models/Store')
  }
}

module.exports = System
