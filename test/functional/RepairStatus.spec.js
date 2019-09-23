const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'Repair Status'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const RepairStatus = use('App/Models/RepairStatus');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await RepairStatus.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no repair statuses', async ({ client }) => {
  const response = await client.get('/repairstatus').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all repair statuses', async ({ client }) => {
  await RepairStatus.create({
    title: 'repair_status',
    description: 'repair_status_description_1',
  });

  const response = await client.get('/repairstatus').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: 'repair_status',
      description: 'repair_status_description_1',
    },
  ]);
});

test('it should save a new repair status', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'repair_status',
    description: 'repair_status_desc',
    creator_id: user.id,
  };
  const response = await client
    .post('/repairstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new repair status if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    diag_title: 'repair_status_title_1',
  };
  const response = await client
    .post('/repairstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(400);
});
