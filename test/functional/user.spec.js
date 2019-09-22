const { test, trait, beforeEach, afterEach } = use('Test/Suite')('User registration')
const Mail = use('Mail')
const User = use('App/Models/User')

trait('Test/ApiClient')
// trait('DatabaseTransactions')

beforeEach(async () => {
  await User.query().delete()
  Mail.fake()
})

afterEach(async () => {
  Mail.restore()
})

test('should create an User', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'teste user',
    email: 'm3@m.com',
    password: '123'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'teste user',
    email: 'm3@m.com'
  })

  const user = await User.findBy('username', 'teste user')
  assert.equal(user.toJSON().email, 'm3@m.com')
})

test('should not create an User if no data is provided', async ({ client, assert }) => {
  const response = await client.post('/users').end()

  response.assertStatus(500) // must error out "internal server error"
  const user = await User.findBy('email', 'm3@m.com')
  assert.isNull(user)
})

// todo test user already exists
test('should not create an User if email is already in use', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'teste user',
    email: 'm3@m.com',
    password: '123'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'teste user',
    email: 'm3@m.com'
  })

  const responseUser = await client.post('/users').send({
    username: 'teste user2',
    email: 'm3@m.com',
    password: '123'
  }).end()
  responseUser.assertStatus(500)
})

test('should not create an User if user is already in use', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'teste user',
    email: 'm3@m.com',
    password: '123'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'teste user',
    email: 'm3@m.com'
  })

  const responseUser = await client.post('/users').send({
    username: 'teste user',
    email: 'm4@m.com',
    password: '123'
  }).end()
  responseUser.assertStatus(500)
})

// TODO Should not create an user with insecure password
