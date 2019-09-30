/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with serviceorders
 */

const User = use('App/Models/User');
const ServiceOrder = use('App/Models/ServiceOrder');

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
  async index({ auth }) {
    const user = await User.findOrFail(auth.user.id);
    await user.load('stores');
    const stores = user.toJSON().stores.map(store => store.id);
    // console.log(stores);
    const serviceOrders = await ServiceOrder.query()
      .with('creator')
      .with('client')
      .with('store')
      .whereIn('store_id', stores)
      .with('equipment')
      .with('priority')
      .with('osStatus')
      .with('diagStatus')
      .with('repairStatus')
      .with('paymentStatus')
      .with('diagnostics')
      .fetch();
    // console.log(
    //   serviceOrders.toJSON().map(so => ({ so: so.id, store_id: so.store.id }))
    // );
    return serviceOrders;
  }

  /**
   * Create/save a new serviceorder.
   * POST serviceorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only([
      'creator_id',
      'client_id',
      'store_id',
      'equipment_id',
      'serial_number',
      'equipment_model',
      'accessories',
      'os_number',
      'os_type',
      'os_status_id',
      'priority_id',
      'diag_status_id',
      'problem_description',
      'repair_status_id',
      'observation',
      'payment_status_id',
      'payment_type',
      'paid_value',
      'delivery_date',
      'warranty',
      'received_by',
      'creator_id',
    ]);
    // data.active = true
    data.creator_id = data.creator_id ? data.creator_id : 1;
    const serviceOrder = await ServiceOrder.create(data);
    return serviceOrder;
  }

  async show({ params }) {
    const serviceOrder = await ServiceOrder.findOrFail(params.id);
    // await serviceOrder.loadMany([
    //   'creator',
    //   'client',
    //   'store',
    //   'equipment',
    //   'priority',
    //   'osStatus',
    //   'diagStatus',
    //   'repairStatus',
    //   'paymentStatus',
    //   'diagnostics',
    // ]);
    await serviceOrder.load('diagnostics');
    // TODO load serviceOrder orders
    return serviceOrder;
  }

  /**
   * Update serviceorder details.
   * PUT or PATCH serviceorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only([
      'creator_id',
      'client_id',
      'store_id',
      'equipment_id',
      'serial_number',
      'equipment_model',
      'accessories',
      'os_number',
      'os_type',
      'os_status_id',
      'priority_id',
      'diag_status_id',
      'problem_description',
      'repair_status_id',
      'observation',
      'payment_status_id',
      'payment_type',
      'paid_value',
      'delivery_date',
      'warranty',
      'received_by',
    ]);
    const serviceOrder = await ServiceOrder.findOrFail(params.id);
    serviceOrder.merge(data);
    await serviceOrder.save();
    const { diagnostics, repairs } = request.only(['diagnostics', 'repairs']);

    if (repairs) {
      await serviceOrder.repairs().sync(repairs);
    }

    if (diagnostics) {
      await serviceOrder.diagnostics().sync(diagnostics);
    }

    await serviceOrder.loadMany(['diagnostics', 'repairs']);
    return serviceOrder;
  }

  /**
   * Delete a serviceorder with id.
   * DELETE serviceorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const serviceOrder = await ServiceOrder.findOrFail(params.id);
    serviceOrder.delete();
    return response
      .status(200)
      .send({ success: { message: 'serviceOrder deleted' } });
  }
}

module.exports = ServiceOrderController;
