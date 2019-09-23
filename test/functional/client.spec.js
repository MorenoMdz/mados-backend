const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Clients');
const Mail = use('Mail');
const User = use('App/Models/User');
const Client = use('App/Models/Client');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Client.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no clients', async ({ client }) => {
  const response = await client.get('/clients').end();
  response.assertStatus(200);
  response.assertJSONSubset({
    total: '0',
    perPage: 20,
    page: 1,
    lastPage: 0,
    data: [],
  });
});

test('it should list all clients', async ({ client }) => {
  await Client.create({
    name: 'client_1',
    last_name: 'client_1',
    cpf: '123.123.123-33',
    gender: 'F',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    active: true,
  });
  const response = await client.get('/clients').end();
  response.assertStatus(200);
  response.assertJSONSubset({
    total: '1',
    perPage: 20,
    page: 1,
    lastPage: 1,
    data: [
      {
        active: true,
        name: 'client_1',
        last_name: 'client_1',
        cpf: '123.123.123-33',
        gender: 'F',
        email: 't@t.com',
        phone1: '123',
        phone2: '123',
        address: null,
      },
    ],
  });
});

test('it should save a new client', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const clientPayload = {
    name: 'client_1',
    last_name: 'client_1',
    cpf: '123.123.123-33',
    gender: 'F',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    user_id: user.id,
  };
  const response = await client
    .post('/clients')
    .loginVia(user)
    .send(clientPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new client if validation fails', async ({
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
