'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  address () {
    return this.hasOne('App/Models/Address')
  }
}

module.exports = Client
