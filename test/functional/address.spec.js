const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Address')
const Mail = use('Mail')
const User = use('App/Models/User')
const Address = use('App/Models/Address')

trait('Auth/Client')
trait('Test/ApiClient')

beforeEach(async () => {
  await User.query().delete()
  await Address.query().delete()
  Mail.fake()
})

afterEach(async () => {
  Mail.restore()
})

test('should list no address', async ({ client }) => {
  const response = await client.get('/address').end()
  response.assertStatus(200)
  response.assertJSON([])
})

test('should list all address', async ({ client }) => {
  const address = await Address.create({
    street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300'
  })

  const response = await client.get('/address').end()
  response.assertStatus(200)
  response.assertJSONSubset([{}])

  // street: 'street',
  // number: '123',
  // district: 'chinatown',
  // complement: 'none',
  // city: 'fpolis',
  // state: 'sc',
  // country: 'Brazil',
  // zip: '88010300'
})

test('should save a new address', async ({ client }) => {
  const user = await User.create({
    username: 'teste user',
    email: 'm3@m.com',
    password: '123'
  })
  const response = await client.post('/address')/* .loginVia(user) */.send({
    street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300'
  }).end()

  // response.assertStatus(200)
  // response.assertJSONSubset([{ a: 'a' }])
})
