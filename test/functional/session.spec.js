const {
  test, trait, beforeEach, afterEach
} = use('Test/Suite')('Session')
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

test('should return WT token when auth', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'm3@m.com',
    password: '123'
  }
  const user = await Factory.model('App/Models/User').create(sessionPayload)
  const response = await client.post('/sessions').send(sessionPayload).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})
