const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Address');
const Mail = use('Mail');
const Role = use('Role');
const Factory = use('Factory');
const User = use('App/Models/User');
const Address = use('App/Models/Address');

trait('Auth/Client');
trait('Test/ApiClient');
trait('DatabaseTransactions');

beforeEach(async () => {
  await User.query().delete();
  await Role.query().delete();
  await Address.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

async function generateAdminUser() {
  const user = await Factory.model('App/Models/User').create();
  const role = await Role.create({
    name: 'Administrator',
    slug: 'administrator',
    description: 'administrator of a store',
  });
  await user.roles().attach(role.id);
  await user.loadMany(['roles', 'permissions']);

  return user;
}

test('it should list no address', async ({ client }) => {
  const admin = await generateAdminUser();
  const response = await client
    .get('/address')
    .loginVia(admin)
    .end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all addresses', async ({ client }) => {
  const admin = await generateAdminUser();
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
    .loginVia(admin)
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
  const admin = await generateAdminUser();
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
    .loginVia(admin)
    .send(address)
    .end();
  response.assertStatus(200);
});

test('it should not save a new address if validation fail', async ({
  client,
}) => {
  const admin = await generateAdminUser();
  const address = {
    // street: 'street',
    number: '123',
    district: 'chinatown',
    complement: 'none',
    city: 'fpolis',
    state: 'sc',
    country: 'Brazil',
    zip: '88010300',
    user_id: admin.id,
  };
  const response = await client
    .post('/address')
    .loginVia(admin)
    .send(address)
    .end();
  response.assertStatus(400);
});
