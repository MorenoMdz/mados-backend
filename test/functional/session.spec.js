const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Session');

const Mail = use('Mail');
const User = use('App/Models/User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

beforeEach(async () => {
  await User.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should return JWT token when auth', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'm3@m.com',
    password: '123',
  };
  await Factory.model('App/Models/User').create(sessionPayload);
  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
