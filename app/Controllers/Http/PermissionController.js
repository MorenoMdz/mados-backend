const Permission = use('Permission');

class PermissionController {
  async index() {
    const permissions = await Permission.all();
    return permissions;
  }

  async store({ request }) {
    const data = request.only(['name', 'slug', 'description']);
    const permission = await Permission.create(data);
    return permission;
  }

  async update({ request, params }) {
    const data = request.only(['name', 'slug', 'description']);
    const permission = await Permission.findOrFail(params.id);
    permission.merge(data);
    await permission.save();
    return permission;
  }

  async destroy({ params }) {
    const permission = await Permission.findOrFail(params.id);
    permission.delete();
  }
}

module.exports = PermissionController;
