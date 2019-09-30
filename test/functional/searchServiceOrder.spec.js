const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Search');
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
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .get('/search?type=raw&value=invalidQuery')
    .loginVia(user)
    .end();

  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should only list Service Orders that Match the query', async ({
  client,
  assert,
}) => {
  const store = await Factory.model('App/Models/Store').create();
  const user = await Factory.model('App/Models/User').create();
  const serviceOrderOne = await Factory.model('App/Models/ServiceOrder').create(
    { store_id: store.id, os_number: 'A000123' }
  );
  assert.equal(serviceOrderOne.toJSON().store_id, store.id);
  const serviceOrderTwo = await Factory.model(
    'App/Models/ServiceOrder'
  ).create();
  assert.notEqual(serviceOrderTwo.toJSON().store_id, store.id);
  const userUpdateResponse = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ stores: [store.id] })
    .end();
  assert.equal(userUpdateResponse.body.stores[0].id, store.id);

  const response = await client
    .get(`/search?type=raw&value=${serviceOrderOne.os_number}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  const found = response.body.map(item => item.os_number);
  assert.include(found, serviceOrderOne.toJSON().os_number);
  assert.notInclude(found, serviceOrderTwo.toJSON().os_number);
});

test('it should only list Service Orders that Match the DiagStatus', async ({
  client,
  assert,
}) => {
  const store = await Factory.model('App/Models/Store').create();
  const user = await Factory.model('App/Models/User').create();
  const diagStatus = await Factory.model('App/Models/DiagStatus').create();
  const serviceOrderOne = await Factory.model('App/Models/ServiceOrder').create(
    { store_id: store.id, diag_status_id: diagStatus.id }
  );
  assert.equal(serviceOrderOne.toJSON().store_id, store.id);

  const serviceOrderTwo = await Factory.model(
    'App/Models/ServiceOrder'
  ).create();
  assert.notEqual(serviceOrderTwo.toJSON().store_id, store.id);

  const userUpdateResponse = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ stores: [store.id] })
    .end();
  assert.equal(userUpdateResponse.body.stores[0].id, store.id);

  const response = await client
    .get(`/search?type=status&status=diagstatus&value=${diagStatus.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  const found = response.body.map(item => item.os_number);
  assert.include(found, serviceOrderOne.toJSON().os_number);
  assert.notInclude(found, serviceOrderTwo.toJSON().os_number);
});

test('it should only list Service Orders that Match the RepairStatus', async ({
  client,
  assert,
}) => {
  const store = await Factory.model('App/Models/Store').create();
  const user = await Factory.model('App/Models/User').create();
  const repairStatus = await Factory.model('App/Models/RepairStatus').create();
  const serviceOrderOne = await Factory.model('App/Models/ServiceOrder').create(
    { store_id: store.id, repair_status_id: repairStatus.id }
  );
  assert.equal(serviceOrderOne.toJSON().store_id, store.id);

  const serviceOrderTwo = await Factory.model(
    'App/Models/ServiceOrder'
  ).create();
  assert.notEqual(serviceOrderTwo.toJSON().store_id, store.id);

  const userUpdateResponse = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ stores: [store.id] })
    .end();
  assert.equal(userUpdateResponse.body.stores[0].id, store.id);

  const response = await client
    .get(`/search?type=status&status=repairstatus&value=${repairStatus.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  const found = response.body.map(item => item.os_number);
  assert.include(found, serviceOrderOne.toJSON().os_number);
  assert.notInclude(found, serviceOrderTwo.toJSON().os_number);
});

test('it should only list Service Orders that Match the ServiceOrderStatus', async ({
  client,
  assert,
}) => {
  const store = await Factory.model('App/Models/Store').create();
  const user = await Factory.model('App/Models/User').create();
  const osStatus = await Factory.model('App/Models/OsStatus').create();
  const serviceOrderOne = await Factory.model('App/Models/ServiceOrder').create(
    { store_id: store.id, os_status_id: osStatus.id }
  );
  assert.equal(serviceOrderOne.toJSON().store_id, store.id);

  const serviceOrderTwo = await Factory.model(
    'App/Models/ServiceOrder'
  ).create();
  assert.notEqual(serviceOrderTwo.toJSON().store_id, store.id);

  const userUpdateResponse = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ stores: [store.id] })
    .end();
  assert.equal(userUpdateResponse.body.stores[0].id, store.id);

  const response = await client
    .get(`/search?type=status&status=osstatus&value=${osStatus.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  const found = response.body.map(item => item.os_number);
  assert.include(found, serviceOrderOne.toJSON().os_number);
  assert.notInclude(found, serviceOrderTwo.toJSON().os_number);
});

test('it should only list Service Orders that Match the PaymentStatus', async ({
  client,
  assert,
}) => {
  const store = await Factory.model('App/Models/Store').create();
  const user = await Factory.model('App/Models/User').create();
  const paymentStatus = await Factory.model(
    'App/Models/PaymentStatus'
  ).create();
  const serviceOrderOne = await Factory.model('App/Models/ServiceOrder').create(
    { store_id: store.id, payment_status_id: paymentStatus.id }
  );
  assert.equal(serviceOrderOne.toJSON().store_id, store.id);

  const serviceOrderTwo = await Factory.model(
    'App/Models/ServiceOrder'
  ).create();
  assert.notEqual(serviceOrderTwo.toJSON().store_id, store.id);

  const userUpdateResponse = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send({ stores: [store.id] })
    .end();
  assert.equal(userUpdateResponse.body.stores[0].id, store.id);

  const response = await client
    .get(`/search?type=status&status=paymentstatus&value=${paymentStatus.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  const found = response.body.map(item => item.os_number);
  assert.include(found, serviceOrderOne.toJSON().os_number);
  assert.notInclude(found, serviceOrderTwo.toJSON().os_number);
});
