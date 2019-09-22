'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
  async index () {
    const user = await User.query()/* .with('user') */.fetch()
    return user
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('admin@mados.tech')
        .subject('Welcome new User')
    })
    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    // TODO load user orders
    return user
  }

  async update ({ params, request }) {
    const data = request.only(['email', 'password'])
    const user = await User.findOrFail(params.id)
    user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ params, response }) {
    const user = await User.findOrFail(params.id)
    user.delete()
    return response.status(200).send({ success: { message: 'user deleted' } })
  }
}

module.exports = UserController
