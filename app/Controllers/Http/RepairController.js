'use strict'

const Repair = use('App/Models/Repair')

class RepairController {
  async index () {
    const repair = await Repair.query()/* .with('user') */.fetch()
    return repair
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const repair = await Repair.create({ ...data })
    return repair
  }

  async show ({ params }) {
    const repair = await Repair.findOrFail(params.id)
    // TODO load repair orders
    return repair
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const repair = await Repair.findOrFail(params.id)
    repair.merge(data)
    await repair.save()
    return repair
  }

  async destroy ({ params, response }) {
    const repair = await Repair.findOrFail(params.id)
    repair.delete()
    return response.status(200).send({ success: { message: 'repair deleted' } })
  }
}

module.exports = RepairController
