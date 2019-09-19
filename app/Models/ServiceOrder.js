'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceOrder extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  client () {
    return this.belongsTo('App/Models/Client')
  }

  store () {
    return this.belongsTo('App/Models/Store')
  }

  equipment () {
    return this.hasOne('App/Models/Equipment')
  }

  priority () {
    return this.hasOne('App/Models/Priority')
  }

  osStatus () {
    return this.hasOne('App/Models/OsStatus')
  }

  diagStatus () {
    return this.hasOne('App/Models/DiagStatus')
  }

  repairStatus () {
    return this.hasOne('App/Models/RepairStatus')
  }

  paymentStatus () {
    return this.hasOne('App/Models/PaymentStatus')
  }
}

module.exports = ServiceOrder
