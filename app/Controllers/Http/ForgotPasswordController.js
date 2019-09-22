const crypto = require('crypto');
const moment = require('moment');

const User = use('App/Models/User');
const Mail = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(['emails.forgot_password'], { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` }, (message) => { message.to(user.email).from('admin@mados.tech', 'Admin | MadOs').subject('Password Recovery MadOs'); });

      return response.status(200).send({ success: { message: 'password reset request sent' } });
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Something went wrong' } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();
      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment().subtract('2', 'hours').isAfter(user.token_created_at);
      if (tokenExpired) {
        return response.status(401).send({ success: { message: 'This password token is expired' } });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;
      await user.save();
      return response.status(200).send({ success: { message: 'password updated' } });
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Something went wrong with your token' } });
    }
  }
}

module.exports = ForgotPasswordController;
