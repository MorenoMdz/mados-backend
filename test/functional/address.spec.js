const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Address');
const Mail = use('Mail');
const User = use('App/Models/User');
const Address = use('App/Models/Address');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Address.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no address', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get('/address')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all addresses', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  await Address.create({
    street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300',
  });

  const response = await client
    .get('/address')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      street: 'street',
      number: 123,
      district: 'chinatown',
      complement: 'none',
      city: 'fpolis',
      state: 'sc',
      country: 'Brazil',
      zip: '88010300',
    },
  ]);
});

test('it should save a new address', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const address = {
    street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300',
    // user_id: user.id,
  };
  const response = await client
    .post('/address')
    .loginVia(user)
    .send(address)
    .end();
  response.assertStatus(200);
});

test('it should not save a new address if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const address = {
    // street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300',
    user_id: user.id,
  };
  const response = await client
    .post('/address')
    .loginVia(user)
    .send(address)
    .end();
  response.assertStatus(400);
});
