

const Client = use('App/Models/Client')

class ClientController {
  async index () {
    const clients = await Client.query().with('address').fetch()
    return clients
  }

  async store ({ request }) {
    const data = request.only(['name', 'last_name', 'cpf', 'gender', 'email', 'phone1', 'phone2'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const client = await Client.create({ ...data })
    return client
  }

  async show ({ params }) {
    const client = await Client.findOrFail(params.id)
    // TODO load client orders
    return client
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'last_name', 'cpf', 'gender', 'email', 'phone1', 'phone2'])
    const client = await Client.findOrFail(params.id)
    client.merge(data)
    await client.save()
    return client
  }

  async destroy ({ params, response }) {
    const client = await Client.findOrFail(params.id)
    client.delete()
    return response.status(200).send({ success: { message: 'client deleted' } })
  }
}

module.exports = ClientController
