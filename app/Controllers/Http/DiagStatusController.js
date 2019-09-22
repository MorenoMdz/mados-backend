const DiagStatus = use('App/Models/DiagStatus');

class DiagStatusController {
  async index() {
    const diagStatus = await DiagStatus.query().fetch();
    return diagStatus;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description']);
    data.creator_id = auth.user ? auth.user.id : 1;
    const diagStatus = await DiagStatus.create({ ...data });
    return diagStatus;
  }

  async show({ params }) {
    const diagStatus = await DiagStatus.findOrFail(params.id);
    // TODO load diagStatus orders
    return diagStatus;
  }

  async update({ params, request }) {
    const data = request.only(['title', 'description']);
    const diagStatus = await DiagStatus.findOrFail(params.id);
    diagStatus.merge(data);
    await diagStatus.save();
    return diagStatus;
  }

  async destroy({ params, response }) {
    const diagStatus = await DiagStatus.findOrFail(params.id);
    diagStatus.delete();
    return response
      .status(200)
      .send({ success: { message: 'diagStatus deleted' } });
  }
}

module.exports = DiagStatusController;
