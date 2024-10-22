const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Systems');
const Mail = use('Mail');
const User = use('App/Models/User');
const System = use('App/Models/System');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await System.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no systems', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .get('/systems')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all systems', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  await System.create({
    name: 'system_1',
    cnpj: '123.123.123-33',
    email: 't@t.com',
    information: 't@t.com',
    owner_id: user.id,
    creator_id: user.id,
  });
  const response = await client
    .get('/systems')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: 'system_1',
      cnpj: '123.123.123-33',
      email: 't@t.com',
      information: 't@t.com',
    },
  ]);
});

test('it should save a new system', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const systemPayload = {
    name: 'system_1',
    cnpj: '123.123.123-33',
    email: 't@t.com',
    information: 't@t.com',
    owner_id: user.id,
    creator_id: user.id,
  };
  const response = await client
    .post('/systems')
    .loginVia(user)
    .send(systemPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new system if validation fails', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .post('/systems')
    .loginVia(user)
    .send()
    .end();
  response.assertStatus(400);
});

test('it should add a User to a System', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const system = await Factory.model('App/Models/System').create();
  const response = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ system_id: system.id })
    .end();
  response.assertStatus(200);
  response.assertJSONSubset({ system_id: system.id });
});
