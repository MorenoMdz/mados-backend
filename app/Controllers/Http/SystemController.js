'use strict'

const System = use('App/Models/System')

class SystemController {
  async index () {
    const system = await System.query()/* .with('user') */.fetch()
    return system
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const system = await System.create({ ...data })
    return system
  }

  async show ({ params }) {
    const system = await System.findOrFail(params.id)
    // TODO load system orders
    return system
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const system = await System.findOrFail(params.id)
    system.merge(data)
    await system.save()
    return system
  }

  async destroy ({ params, response }) {
    const system = await System.findOrFail(params.id)
    system.delete()
    return response.status(200).send({ success: { message: 'system deleted' } })
  }
}

module.exports = SystemController