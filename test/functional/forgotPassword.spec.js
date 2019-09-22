const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Forgot Password')
const Factory = use('Factory')

const Mail = use('Mail')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

beforeEach(async () => {
  await User.query().delete()
  Mail.fake()
})

afterEach(async () => {
  Mail.restore()
})

test('it should send an email with the reset instruction', async ({ assert, client }) => {
  const forgotPayload = { email: 'm3@m.com' }
  await Factory.model('App/Models/User').create(forgotPayload)
  const response = await client.post('/forgot').send(forgotPayload).end()

  response.assertStatus(200)
  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, forgotPayload.email)
})
