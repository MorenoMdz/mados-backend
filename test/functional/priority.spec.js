const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Priority');
const Mail = use('Mail');
const User = use('App/Models/User');
const Priority = use('App/Models/Priority');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Priority.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no priorities', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .get('/priorities')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all priorities', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  await Priority.create({
    title: 'priority_',
    description: 'priority_description_1',
  });

  const response = await client
    .get('/priorities')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: 'priority_',
      description: 'priority_description_1',
    },
  ]);
});

test('it should save a new priority', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'priority_',
    description: 'priority_desc',
    creator_id: user.id,
  };
  const response = await client
    .post('/priorities')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new priority if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'priority_title_1',
  };
  const response = await client
    .post('/priorities')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(400);
});
