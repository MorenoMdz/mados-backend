const { test, trait, beforeEach, afterEach } = use('Test/Suite')('File');
const Mail = use('Mail');
const Helpers = use('Helpers');
const User = use('App/Models/User');
const File = use('App/Models/File');
const Drive = use('Drive');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await File.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no files', async ({ client }) => {
  const response = await client.get('/files').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should save a file and list all files', async ({ client }) => {
  const response = await client
    .post('files')
    .attach('file', Helpers.tmpPath('uploads/testfile.jpeg'))
    .end();
  response.assertStatus(200);
  await Drive.delete(`uploads/${response.body.file}`);
});

test('it should not save a new file status if validation fail', async ({
  client,
}) => {
  const response = await client.post('files').end();
  response.assertStatus(400);
});