'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  users () {
    return this.belongsTo('App/Models/User')
  }

  serviceOrder () {
    return this.hasMany('App/Models/ServiceOrder')
  }

  address () {
    return this.hasOne('App/Models/ServiceOrder')
  }
}

module.exports = Store
