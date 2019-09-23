const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Os Status');
const Mail = use('Mail');
const User = use('App/Models/User');
const OsStatus = use('App/Models/OsStatus');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await OsStatus.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no service order statuses', async ({ client }) => {
  const response = await client.get('/osstatus').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all service order statuses', async ({ client }) => {
  await OsStatus.create({
    title: 'os_status',
    description: 'os_status_description_1',
  });

  const response = await client.get('/osstatus').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: 'os_status',
      description: 'os_status_description_1',
    },
  ]);
});

test('it should save a new service order status', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'os_status',
    description: 'os_status_desc',
    creator_id: user.id,
  };
  const response = await client
    .post('/osstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new service order status if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    diag_title: 'os_status_title_1',
  };
  const response = await client
    .post('/osstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(400);
});
