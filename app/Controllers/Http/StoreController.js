'use strict'

const Store = use('App/Models/Store')

class StoreController {
  async index () {
    const store = await Store.query()/* .with('user') */.fetch()
    return store
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const store = await Store.create({ ...data })
    return store
  }

  async show ({ params }) {
    const store = await Store.findOrFail(params.id)
    // TODO load store orders
    return store
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
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
