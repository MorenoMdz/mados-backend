'use strict'

const RepairStatus = use('App/Models/RepairStatus')

class RepairStatusController {
  async index () {
    const repairStatus = await RepairStatus.query()/* .with('user') */.fetch()
    return repairStatus
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])
    data.creator_id = auth.user ? auth.user.id : 1
    const repairStatus = await RepairStatus.create({ ...data })
    return repairStatus
  }

  async show ({ params }) {
    const repairStatus = await RepairStatus.findOrFail(params.id)
    // TODO load repairStatus orders
    return repairStatus
  }

  async update ({ params, request }) {
    const data = request.only(['title', 'description'])
    const repairStatus = await RepairStatus.findOrFail(params.id)
    repairStatus.merge(data)
    await repairStatus.save()
    return repairStatus
  }

  async destroy ({ params, response }) {
    const repairStatus = await RepairStatus.findOrFail(params.id)
    repairStatus.delete()
    return response.status(200).send({ success: { message: 'repairStatus deleted' } })
  }
}

module.exports = RepairStatusController
