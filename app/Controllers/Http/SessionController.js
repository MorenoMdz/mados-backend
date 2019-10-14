class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async show({ response, auth }) {
    if (!auth)
      return response.status(401).send({ error: { message: 'not allowed' } });
    return { message: 'ok' };
  }
}

module.exports = SessionController;
