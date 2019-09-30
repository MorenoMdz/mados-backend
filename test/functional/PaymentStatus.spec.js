const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'Payment Status'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const PaymentStatus = use('App/Models/PaymentStatus');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await PaymentStatus.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no payment statuses', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .get('/paymentstatus')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all payment statuses', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  await PaymentStatus.create({
    title: 'payment_status',
    description: 'payment_status_description_1',
  });

  const response = await client
    .get('/paymentstatus')
    .loginVia(user)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: 'payment_status',
      description: 'payment_status_description_1',
    },
  ]);
});

test('it should save a new payment status', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    title: 'payment_status',
    description: 'payment_status_desc',
    creator_id: user.id,
  };
  const response = await client
    .post('/paymentstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(200);
});

test('it should not save a new payment status if validation fail', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const statusPayload = {
    diag_title: 'payment_status_title_1',
  };
  const response = await client
    .post('/paymentstatus')
    .loginVia(user)
    .send(statusPayload)
    .end();
  response.assertStatus(400);
});
