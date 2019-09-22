const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Forgot Password')
const Factory = use('Factory')
const Mail = use('Mail')
const Hash = use('Hash')
const User = use('App/Models/User')
const Database = use('Database')
const { subHours, format } = require('date-fns')

trait('Test/ApiClient')
trait('DatabaseTransactions')

beforeEach(async () => {
  await User.query().delete()
  Mail.fake()
})

afterEach(async () => {
  Mail.restore()
})

async function callForgotPasswordToken (email, client) {
  const forgotPayload = { email: email }
  const user = await Factory.model('App/Models/User').create(forgotPayload)
  const response = await client.post('/forgot').send(forgotPayload).end()
  response.assertStatus(200)
  const userWithToken = await User.findByOrFail('email', email)
  return { user, userWithToken }
}

test('it should send an email with the reset instruction', async ({ assert, client }) => {
  const email = 'm3@m.com'
  const { userWithToken, user } = await callForgotPasswordToken(email, client)
  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, email)
  const { token } = await User.findByOrFail('email', email)
  assert.include(userWithToken.toJSON(), { id: user.id, token: token })
})

test('it should update the password', async ({ assert, client }) => {
  const email = 'm3@m.com'
  const { userWithToken } = await callForgotPasswordToken(email, client)
  const { token } = userWithToken
  const payload = { token, password: '123', password_confirmation: '123' }
  const response = await client.put('/forgot').send(payload).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    success: {
      message: 'password updated'
    }
  })
  const updatedUser = await User.findBy('email', email)
  const updatedPassword = await Hash.verify('123', updatedUser.password)
  assert.isTrue(updatedPassword)
})

test('it should not update the password with an expired token', async ({ assert, client }) => {
  const email = 'm3@m.com'
  const { userWithToken } = await callForgotPasswordToken(email, client)

  const user = await User.findBy('email', userWithToken.email)
  const twoHoursAgoDate = format(subHours(new Date(), -1, 'Etc/UTC'), 'yyyy-MM-dd HH:ii:ss')
  user.token_created_at = twoHoursAgoDate
  await user.save()
  await user.reload()
  const { token } = user
  const payload = { token, password: '123', password_confirmation: '123' }
  const response = await client.put('/forgot').send(payload).end()
  response.assertStatus(401)
})

test('it should not update the password with an invalid token', async ({ assert, client }) => {
  const email = 'm3@m.com'
  const { userWithToken } = await callForgotPasswordToken(email, client)
  const token = 'invalid_token'
  const payload = { token, password: '123', password_confirmation: '123' }
  const response = await client.put('/forgot').send(payload).end()
  response.assertStatus(404)
})
