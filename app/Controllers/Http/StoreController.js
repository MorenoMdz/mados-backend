

const Store = use('App/Models/Store')

class StoreController {
  async index () {
    const store = await Store.query().with('address').with('creator').fetch()
    return store
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'cnpj', 'email', 'phone1', 'phone2', 'vip_level', 'owner_id', 'address_id'])
    data.active = true
    data.creator_id = auth.user ? auth.user.id : 1
    const store = await Store.create(data)
    return store
  }

  async show ({ params }) {
    const store = await Store.findOrFail(params.id)
    // TODO load store orders
    return store
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'cnpj', 'email', 'phone1', 'phone2', 'vip_level', 'onwer_id', 'address_id'])
    const store = await Store.findOrFail(params.id)
    store.merge(data)
    await store.save()
    return store
  }

  async destroy ({ params, response }) {
    const store = await Store.findOrFail(params.id)
    store.delete()
    return response.status(200).send({ success: { message: 'store deleted' } })
  }
}

module.exports = StoreController
