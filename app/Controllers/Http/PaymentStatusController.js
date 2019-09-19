'use strict'
const PaymentStatus = use('App/Models/PaymentStatus')

class PaymentStatusController {
  async index () {
    const paymentStatus = await PaymentStatus.query()/* .with('user') */.fetch()
    return paymentStatus
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const paymentStatus = await PaymentStatus.create({ ...data })
    return paymentStatus
  }

  async show ({ params }) {
    const paymentStatus = await PaymentStatus.findOrFail(params.id)
    // TODO load paymentStatus orders
    return paymentStatus
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const paymentStatus = await PaymentStatus.findOrFail(params.id)
    paymentStatus.merge(data)
    await paymentStatus.save()
    return paymentStatus
  }

  async destroy ({ params, response }) {
    const paymentStatus = await PaymentStatus.findOrFail(params.id)
    paymentStatus.delete()
    return response.status(200).send({ success: { message: 'paymentStatus deleted' } })
  }
}

module.exports = PaymentStatusController
