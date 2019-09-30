const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'User registration'
);
const Mail = use('Mail');
const Hash = use('Hash');
const Factory = use('Factory');
const Helpers = use('Helpers');
const Drive = use('Drive');
const User = use('App/Models/User');

trait('Auth/Client');
trait('Test/ApiClient');
trait('DatabaseTransactions');

beforeEach(async () => {
  await User.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should create an User', async ({ client, assert }) => {
  const response = await client
    .post('/users')
    .send({
      username: 'teste user',
      email: 'm3@m.com',
      password: '123',
      password_confirmation: '123',
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: 'teste user',
    email: 'm3@m.com',
  });

  const user = await User.findBy('username', 'teste user');
  assert.equal(user.toJSON().email, 'm3@m.com');
});

test('it should not create an User if no data is provided', async ({
  client,
  assert,
}) => {
  const response = await client.post('/users').end();

  response.assertStatus(400); // must error out "internal server error"
  const user = await User.findBy('email', 'm3@m.com');
  assert.isNull(user);
});

// todo test user already exists
test('it should not create an User if email is already in use', async ({
  client,
}) => {
  const response = await client
    .post('/users')
    .send({
      username: 'teste user',
      email: 'm3@m.com',
      password: '123',
      password_confirmation: '123',
    })
    .end();

  response.assertStatus(200);

  const responseUser = await client
    .post('/users')
    .send({
      username: 'teste user2',
      email: 'm3@m.com',
      password: '123',
      password_confirmation: '123',
    })
    .end();
  responseUser.assertStatus(400);
});

test('it should not create an User if username is already in use', async ({
  client,
}) => {
  const response = await client
    .post('/users')
    .send({
      username: 'teste user',
      email: 'm3@m.com',
      password: '123',
      password_confirmation: '123',
    })
    .end();
  response.assertStatus(200);

  const responseUser = await client
    .post('/users')
    .send({
      username: 'teste user',
      email: 'm4@m.com',
      password: '123',
      password_confirmation: '123',
    })
    .end();
  responseUser.assertStatus(400);
});

test('it should be able to update an User', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('files')
    .attach('file', Helpers.tmpPath('uploads/testfile.jpeg'))
    .loginVia(user)
    .end();
  response.assertStatus(200);

  const updateResponse = await client
    .put(`/users/${user.toJSON().id}`)
    .send({
      email: 'm4@m.com',
      password: '1234',
      password_confirmation: '1234',
      files: [response.body.id],
    })
    .loginVia(user)
    .end();
  assert.equal(updateResponse.body.files[0].id, response.body.id);
  await user.reload();
  await Drive.delete(`uploads/${response.body.file}`);
  assert.isTrue(await Hash.verify('1234', user.password));
});

// TODO Should create user with roles and perms
// TODO Should not create an user with insecure password
