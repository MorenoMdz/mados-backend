const OsStatus = use('App/Models/OsStatus');

class OsStatusController {
  async index() {
    const osStatus = await OsStatus.query() /* .with('user') */
      .fetch();
    return osStatus;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description', 'creator_id']);
    data.creator_id = data.creator_id ? data.creator_id : 1;
    const osStatus = await OsStatus.create({ ...data });
    return osStatus;
  }

  async show({ params }) {
    const osStatus = await OsStatus.findOrFail(params.id);
    // TODO load osStatus orders
    return osStatus;
  }

  async update({ params, request }) {
    const data = request.only(['title', 'description']);
    const osStatus = await OsStatus.findOrFail(params.id);
    osStatus.merge(data);
    await osStatus.save();
    return osStatus;
  }

  async destroy({ params, response }) {
    const osStatus = await OsStatus.findOrFail(params.id);
    osStatus.delete();
    return response
      .status(200)
      .send({ success: { message: 'osStatus deleted' } });
  }
}

module.exports = OsStatusController;
