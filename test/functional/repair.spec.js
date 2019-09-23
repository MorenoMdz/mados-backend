const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Repair');
const Mail = use('Mail');
const User = use('App/Models/User');
const Repair = use('App/Models/Repair');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Repair.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no repairs', async ({ client }) => {
  const response = await client.get('/repairs').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all repairs', async ({ client }) => {
  await Repair.create({
    title: '1',
    description: '1_desc',
    obs: '1_obs',
  });

  const response = await client.get('/repairs').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: '1',
      description: '1_desc',
      obs: '1_obs',
    },
  ]);
});

test('it should save a new repair', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const repairPayload = {
    title: '1',
    description: '1_desc',
    obs: '1_obs',
    creator_id: user.id,
  };
  const response = await client
    .post('/repairs')
    .loginVia(user)
    .send(repairPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new repair if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const repairPayload = {
    title: '1',
    obs: '1_obs',
    creator_id: user.id,
  };
  const response = await client
    .post('/repairs')
    .loginVia(user)
    .send(repairPayload)
    .end();
  response.assertStatus(400);
});
