const Priority = use('App/Models/Priority');

class PriorityController {
  async index() {
    const priority = await Priority.query() /* .with('user') */
      .fetch();
    return priority;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description', 'creator_id']);
    data.creator_id = data.creator_id ? data.creator_id : 1;
    const priority = await Priority.create({ ...data });
    return priority;
  }

  async show({ params }) {
    const priority = await Priority.findOrFail(params.id);
    // TODO load priority orders
    return priority;
  }

  async update({ params, request }) {
    const data = request.only(['title', 'description']);
    const priority = await Priority.findOrFail(params.id);
    priority.merge(data);
    await priority.save();
    return priority;
  }

  async destroy({ params, response }) {
    const priority = await Priority.findOrFail(params.id);
    priority.delete();
    return response
      .status(200)
      .send({ success: { message: 'priority deleted' } });
  }
}

module.exports = PriorityController;
