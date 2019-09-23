const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Diagnostic');
const Mail = use('Mail');
const User = use('App/Models/User');
const Diagnostic = use('App/Models/Diagnostic');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await Diagnostic.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no diagnostics', async ({ client }) => {
  const response = await client.get('/diagnostics').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all diagnostics', async ({ client }) => {
  await Diagnostic.create({
    diag_title: 'diag_1',
    diag_description: 'diag_1_desc',
    diag_obs: 'diag_1_obs',
  });

  const response = await client.get('/diagnostics').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      diag_title: 'diag_1',
      diag_description: 'diag_1_desc',
      diag_obs: 'diag_1_obs',
    },
  ]);
});

test('it should save a new diagnostic', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const diagnosticPayload = {
    diag_title: 'diag_1',
    diag_description: 'diag_1_desc',
    diag_obs: 'diag_1_obs',
    user_id: user.id,
  };
  const response = await client
    .post('/diagnostics')
    .loginVia(user)
    .send(diagnosticPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new diagnostic if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const diagnosticPayload = {
    diag_title: 'diag_1',
    diag_obs: 'diag_1_obs',
    user_id: user.id,
  };
  const response = await client
    .post('/diagnostics')
    .loginVia(user)
    .send(diagnosticPayload)
    .end();
  response.assertStatus(400);
});
