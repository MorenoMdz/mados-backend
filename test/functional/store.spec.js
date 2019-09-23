const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Stores');
const Mail = use('Mail');
const User = use('App/Models/User');
const Store = use('App/Models/Store');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Store.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no stores', async ({ client }) => {
  const response = await client.get('/stores').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all stores', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  await Store.create({
    name: 'client1',
    cnpj: '123.123.123-33',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    active: true,
    owner_id: user.id,
  });
  const response = await client.get('/stores').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: 'client1',
      cnpj: '123.123.123-33',
      email: 't@t.com',
      phone1: '123',
      phone2: '123',
    },
  ]);
});

test('it should save a new store', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const storePlayload = {
    name: 'client1',
    cnpj: '123.123.123-33',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    active: true,
    owner_id: user.id,
    creator_id: user.id,
  };
  const response = await client
    .post('/stores')
    .loginVia(user)
    .send(storePlayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new store if validation fails', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .post('/stores')
    .loginVia(user)
    .send()
    .end();
  response.assertStatus(400);
});
