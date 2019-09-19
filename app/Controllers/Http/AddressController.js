'use strict'

const Address = use('App/Models/Address')

class AddressController {
  async index () {
    const address = await Address.query()/* .with('user') */.fetch()
    return address
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'last_name', 'cpf', 'gender', 'email', 'phone1', 'phone2'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const address = await Address.create({ ...data })
    return address
  }

  async show ({ params }) {
    const address = await Address.findOrFail(params.id)
    // TODO load address orders
    return address
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'last_name', 'cpf', 'gender', 'email', 'phone1', 'phone2'])
    const address = await Address.findOrFail(params.id)
    address.merge(data)
    await address.save()
    return address
  }

  async destroy ({ params, response }) {
    const address = await Address.findOrFail(params.id)
    address.delete()
    return response.status(200).send({ success: { message: 'address deleted' } })
  }
}

module.exports = AddressController
