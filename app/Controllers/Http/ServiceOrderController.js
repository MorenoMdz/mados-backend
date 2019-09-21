'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with serviceorders
 */

const ServiceOrder = use('App/Models/ServiceOrder')

class ServiceOrderController {
  /**
   * Show a list of all serviceorders.
   * GET serviceorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const so = await ServiceOrder.query().with('address').with('user').fetch()
    return so
  }

  /**
   * Create/save a new serviceorder.
   * POST serviceorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['creator_id',
      'client_id',
      'store_id',
      'equipment_id',
      'serial_number',
      'equipment_model',
      'accessories',
      'os_number',
      'os_type',
      'os_status_id',
      'diag_status_id',
      'problem_description',
      'repair_status_id',
      'observation',
      'payment_status_id',
      'payment_type',
      'paid_value',
      'delivery_date',
      'warranty',
      'received_by'])
    data.active = true
    data.creator_id = auth.user ? auth.user.id : 1
    const serviceOrder = await ServiceOrder.create(data)

    // const query = {
    //   "creator_id": 1,
    //   "client_id": 1,
    //   "store_id": 1,
    //   "equipment_id": 1,
    //   "serial_number": "abc123",
    //   "equipment_model": "abc",
    //   "accessories": "abc",
    //   "os_number": "A000123",
    //   "os_type": "type 1",
    //   "os_status_id": 1,
    //   "diag_status_id": 1,
    //   "problem_description": "problem description 1'",
    //   "repair_status_id": 1,
    //   "observation": "os observation 1",
    //   "payment_status_id": 1,
    //   "payment_type": "type 1",
    //   "paid_value": 123,
    //   "delivery_date": "11/11/2011",
    //   "warranty": "90 days",
    //   "received_by": "john doe",

    //   "creator_id",
    //   "client_id",
    //   "store_id",
    //   "equipment_id",
    //   "serial_number",
    //   "equipment_model",
    //   "accessories",
    //   "os_number",
    //   "os_type",
    //   "os_status_id",
    //   "diag_status_id",
    //   "problem_description",
    //   "repair_status_id",
    //   "observation",
    //   "payment_status_id",
    //   "payment_type",
    //   "paid_value",
    //   "delivery_date",
    //   "warranty",
    //   "received_by",
    // }
    return serviceOrder
  }

  /**
   * Display a single serviceorder.
   * GET serviceorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing serviceorder.
   * GET serviceorders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update serviceorder details.
   * PUT or PATCH serviceorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a serviceorder with id.
   * DELETE serviceorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceOrderController
