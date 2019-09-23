const PaymentStatus = use('App/Models/PaymentStatus');

class PaymentStatusController {
  async index() {
    const paymentStatus = await PaymentStatus.query() /* .with('user') */
      .fetch();
    return paymentStatus;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description', 'creator_id']);
    data.creator_id = data.creator_id ? data.creator_id : 1;
    const paymentStatus = await PaymentStatus.create({ ...data });
    return paymentStatus;
  }

  async show({ params }) {
    const paymentStatus = await PaymentStatus.findOrFail(params.id);
    // TODO load paymentStatus orders
    return paymentStatus;
  }

  async update({ params, request }) {
    const data = request.only(['title', 'description']);
    const paymentStatus = await PaymentStatus.findOrFail(params.id);
    paymentStatus.merge(data);
    await paymentStatus.save();
    return paymentStatus;
  }

  async destroy({ params, response }) {
    const paymentStatus = await PaymentStatus.findOrFail(params.id);
    paymentStatus.delete();
    return response
      .status(200)
      .send({ success: { message: 'paymentStatus deleted' } });
  }
}

module.exports = PaymentStatusController;
