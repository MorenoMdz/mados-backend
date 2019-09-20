'use strict'

const Diagnostic = use('App/Models/Diagnostic')

class DiagnosticController {
  async index () {
    const diagnostic = await Diagnostic.query()/* .with('user') */.fetch()
    return diagnostic
  }

  async store ({ request, auth }) {
    const data = request.only(['diag_title', 'diag_description', 'diag_obs'
    ])
    data.diag_creator_id = auth.user ? auth.user.id : 1
    const diagnostic = await Diagnostic.create({ ...data })
    return diagnostic
  }

  async show ({ params }) {
    const diagnostic = await Diagnostic.findOrFail(params.id)
    // TODO load diagnostic orders
    return diagnostic
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'brand', 'details', 'obs'])
    const diagnostic = await Diagnostic.findOrFail(params.id)
    diagnostic.merge(data)
    await diagnostic.save()
    return diagnostic
  }

  async destroy ({ params, response }) {
    const diagnostic = await Diagnostic.findOrFail(params.id)
    diagnostic.delete()
    return response.status(200).send({ success: { message: 'diagnostic deleted' } })
  }
}

module.exports = DiagnosticController
