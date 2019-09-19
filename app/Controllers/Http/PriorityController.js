'use strict'
const Priority = use('App/Models/Priority')

class PriorityController {
  async index () {
    const priority = await Priority.query()/* .with('user') */.fetch()
    return priority
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const priority = await Priority.create({ ...data })
    return priority
  }

  async show ({ params }) {
    const priority = await Priority.findOrFail(params.id)
    // TODO load priority orders
    return priority
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const priority = await Priority.findOrFail(params.id)
    priority.merge(data)
    await priority.save()
    return priority
  }

  async destroy ({ params, response }) {
    const priority = await Priority.findOrFail(params.id)
    priority.delete()
    return response.status(200).send({ success: { message: 'priority deleted' } })
  }
}

module.exports = PriorityController
