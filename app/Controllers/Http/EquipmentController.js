

const Equipment = use('App/Models/Equipment')

class EquipmentController {
  async index () {
    const equipment = await Equipment.query()/* .with('user') */.fetch()
    return equipment
  }

  async store ({ request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    data.active = true
    // data.creator_id = auth.user ? auth.user.id : 1
    const equipment = await Equipment.create({ ...data })
    return equipment
  }

  async show ({ params }) {
    const equipment = await Equipment.findOrFail(params.id)
    // TODO load equipment orders
    return equipment
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const equipment = await Equipment.findOrFail(params.id)
    equipment.merge(data)
    await equipment.save()
    return equipment
  }

  async destroy ({ params, response }) {
    const equipment = await Equipment.findOrFail(params.id)
    equipment.delete()
    return response.status(200).send({ success: { message: 'equipment deleted' } })
  }
}

module.exports = EquipmentController
