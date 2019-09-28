const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'ServiceOrders'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const ServiceOrder = use('App/Models/ServiceOrder');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');
trait('DatabaseTransactions');

beforeEach(async () => {
  await User.query().delete();
  await ServiceOrder.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no Service Orders', async ({ client }) => {
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all Service Orders', async ({ client }) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([{ id: serviceOrder.id }]);
});

test('it should save a new Service Order', async ({ client, assert }) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([{ id: serviceOrder.id }]);
  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  assert.equal(serviceOrderFound.id, serviceOrder.id);
});

test('it should not save a new store if validation fails', async ({
  client,
}) => {
  const response = await client
    .post('serviceorders')
    .send()
    .end();
  response.assertStatus(400);
});

// TODO
// it should update a Service Order to add a Diagnostic
// it should update a Service Order to add a Repair
// it should update a Service Order to change OS Status
// it should update a Service Order to change Diagnostic Status
// it should update a Service Order to change Repair Status
// it should update a Service Order to change Payment Status
// it should update a Service Order to change Priority Status
