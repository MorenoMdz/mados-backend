'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  serviceOrder () {
    return this.hasMany('App/Models/ServiceOrder')
  }
}

module.exports = Store
