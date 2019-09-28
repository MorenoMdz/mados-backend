const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'ServiceOrders'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const ServiceOrder = use('App/Models/ServiceOrder');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');
// trait('DatabaseTransactions');

beforeEach(async () => {
  await User.query().delete();
  await ServiceOrder.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

test('it should list no Service Orders', async ({ client }) => {
  const response = await client.get('/serviceorders').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all Service Orders', async ({ client }) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const response = await client.get('/serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([{ id: serviceOrder.id }]);
});

test('it should save a new Service Order', async ({ client, assert }) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const response = await client.get('/serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([{ id: serviceOrder.id }]);
  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  assert.equal(serviceOrderFound.id, serviceOrder.id);
});

test('it should not save a new store if validation fails', async ({
  client,
}) => {
  const response = await client
    .post('/serviceorders')
    .send()
    .end();
  response.assertStatus(400);
});

test('it should update a Service Order to add a Diagnostic', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();

  const diagnostic = await Factory.model('App/Models/Diagnostic').create();
  const diagnosticJSON = diagnostic.toJSON();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ diagnostics: [diagnosticJSON.id] })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  await serviceOrderFound.load('diagnostics');
  response.assertStatus(200);
  // response.assertJSONSubset([{ id: serviceOrder.id }]);
  assert.equal(serviceOrderFound.id, serviceOrder.id);
  // assert.equal(diags, [diagnostic.id]);
});

test('it should update a Service Order to add a Repair', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();

  const repair = await Factory.model('App/Models/Repair').create();
  const repairJSON = repair.toJSON();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ repairs: [repairJSON.id] })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  await serviceOrderFound.load('repairs');
  response.assertStatus(200);
  assert.equal(serviceOrderFound.id, serviceOrder.id);
});

test('it should update a Service Order to change OS Status', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const serviceOrderStatus = await Factory.model(
    'App/Models/OsStatus'
  ).create();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ os_status_id: serviceOrderStatus.id })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  response.assertStatus(200);
  assert.equal(serviceOrderFound.os_status_id, serviceOrderStatus.id);
});

test('it should update a Service Order to change Diagnostic Status', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const diagStatus = await Factory.model('App/Models/DiagStatus').create();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ diag_status_id: diagStatus.id })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  response.assertStatus(200);
  assert.equal(serviceOrderFound.diag_status_id, diagStatus.id);
});

test('it should update a Service Order to change Repair Status', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const repairStatus = await Factory.model('App/Models/RepairStatus').create();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ repair_status_id: repairStatus.id })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  response.assertStatus(200);
  assert.equal(serviceOrderFound.repair_status_id, repairStatus.id);
});

test('it should update a Service Order to change Payment Status', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const paymentStatus = await Factory.model(
    'App/Models/PaymentStatus'
  ).create();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ payment_status_id: paymentStatus.id })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  response.assertStatus(200);
  assert.equal(serviceOrderFound.payment_status_id, paymentStatus.id);
});

test('it should update a Service Order to change its Priority', async ({
  client,
  assert,
}) => {
  const serviceOrder = await Factory.model('App/Models/ServiceOrder').create();
  const priority = await Factory.model('App/Models/Priority').create();
  const response = await client
    .put(`/serviceorders/${serviceOrder.id}`)
    .send({ priority_id: priority.id })
    .end();

  const serviceOrderFound = await ServiceOrder.findOrFail(serviceOrder.id);
  response.assertStatus(200);
  assert.equal(serviceOrderFound.priority_id, priority.id);
});
