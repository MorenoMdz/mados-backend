const User = use('App/Models/User');
const Kue = use('Kue');
const Job = use('App/Jobs/ServiceOrderEmail');

class UserController {
  async index() {
    const user = await User.query()
      .with('permissions')
      .with('roles')
      .with('files')
      .fetch();
    return user;
  }

  async store({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles',
    ]);
    const user = await User.create(data);

    if (roles) {
      await user.roles().attach(roles);
    }

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    await user.loadMany(['roles', 'permissions']);

    // Kue.dispatch(
    //   Job.key,
    //   { email: user.email, username: user.username },
    //   { attempts: 3 }
    // );

    return user;
  }

  async show({ auth }) {
    // const user = await User.findOrFail(params.id);
    const user = await await auth.getUser();
    await user.loadMany(['files', 'roles', 'permissions', 'stores']);
    return user;
  }

  async update({ params, request }) {
    const { files, stores, permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles',
      'system_id',
      'stores',
      'file_id',
      'files',
      'avatar_url',
    ]);
    const user = await User.findOrFail(params.id);
    user.merge(data);
    await user.save();

    if (roles) {
      await user.roles().sync(roles);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }

    if (stores) {
      await user.stores().sync(stores);
    }

    if (files) {
      await user.files().sync(files);
    }

    if (data.password) {
      user.password = data.password;
    }

    await user.loadMany(['files', 'roles', 'permissions', 'stores']);

    return user;
  }

  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id);
    user.delete();
    return response.status(200).send({ success: { message: 'user deleted' } });
  }
}

module.exports = UserController;
