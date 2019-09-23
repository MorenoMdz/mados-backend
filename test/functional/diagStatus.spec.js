const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'Diagnostic Status'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const DiagStatus = use('App/Models/DiagStatus');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await DiagStatus.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no diagnostics statuses', async ({ client }) => {
  const response = await client.get('/diagstatus').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all diagnostics statuses', async ({ client }) => {
  await DiagStatus.create({
    title: 'diag_status_1',
    description: 'diag_description_1',
  });

  const response = await client.get('/diagstatus').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: 'diag_status_1',
      description: 'diag_description_1',
    },
  ]);
});

test('it should save a new diagnostic status', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'diag_status_1',
    description: 'diag_status_1_desc',
    creator_id: user.id,
  };
  const response = await client
    .post('/diagstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new diagnostic status if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    diag_title: 'diag_1',
  };
  const response = await client
    .post('/diagstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(400);
});
