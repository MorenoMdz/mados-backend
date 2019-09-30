/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with searchserviceorders
 */

const User = use('App/Models/User');
const Database = use('Database');

const ServiceOrder = use('App/Models/ServiceOrder');
class SearchServiceOrderController {
  /**
   * Show a list of all searchserviceorders.
   * GET searchserviceorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth }) {
    const user = await User.findOrFail(auth.user.id);
    await user.load('stores');
    const stores = user.toJSON().stores.map(store => store.id);

    const { type, status, value } = request.get();

    if (type === 'raw') {
      const serviceOrders = await ServiceOrder.query()
        .whereIn('store_id', stores) // match user stores
        .whereHas('client', builder => {
          builder.where('cpf', 'like', `%${value}%`);
        })
        .orWhere('os_number', 'like', `%${value}%`)
        .orWhere('serial_number', 'like', `%${value}%`)
        .with('creator')
        .with('store')
        .with('equipment')
        .with('priority')
        .with('osStatus')
        .with('diagStatus')
        .with('repairStatus')
        .with('paymentStatus')
        .with('diagnostics')
        .with('client')
        .fetch();
      return serviceOrders;
    }
    // 'osstatus' || 'diagstatus' || 'repairstatus';
    function getStatusType() {
      if (status === 'osstatus') return 'os_status_id';
      if (status === 'diagstatus') return 'diag_status_id';
      if (status === 'repairstatus') return 'repair_status_id';
      if (status === 'paymentstatus') return 'payment_status_id';
    }

    if (type === 'status') {
      const serviceOrders = await ServiceOrder.query()
        .whereIn('store_id', stores) // match user stores
        .where(getStatusType(), value)
        .with('creator')
        .with('store')
        .with('equipment')
        .with('priority')
        .with('osStatus')
        .with('diagStatus')
        .with('repairStatus')
        .with('paymentStatus')
        .with('diagnostics')
        .with('client')
        .fetch();
      return serviceOrders;
    }

    console.log(serviceOrders.toJSON().length);
    return serviceOrders;
  }
}

module.exports = SearchServiceOrderController;
