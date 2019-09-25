const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'Service Orders'
);
const Mail = use('Mail');
const User = use('App/Models/User');
const ServiceOrder = use('App/Models/ServiceOrder');
const Factory = use('Factory');

trait('Auth/Client');
trait('Test/ApiClient');

beforeEach(async () => {
  await User.query().delete();
  await ServiceOrder.query().delete();
  Mail.fake();
});

afterEach(async () => {
  Mail.restore();
});

async function generateRelations(client) {
  const user = await Factory.model('App/Models/User').create();
  // Store
  const storePayload = {
    name: 'client1',
    cnpj: '123.123.123-33',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    active: true,
    owner_id: user.id,
    creator_id: user.id,
  };
  const store = await client
    .post('/stores')
    .loginVia(user)
    .send(storePayload)
    .end();
  // equipment
  const equipmentPayload = {
    title: 'diag_status_1',
    description: 'diag_status_1_desc',
    creator_id: user.id,
  };
  const equipment = await client
    .post('/diagstatus')
    .loginVia(user)
    .send(equipmentPayload)
    .end();

  // client
  const clientPayload = {
    name: 'client_1',
    last_name: 'client_1',
    cpf: '123.123.123-33',
    gender: 'F',
    email: 't@t.com',
    phone1: '123',
    phone2: '123',
    user_id: user.id,
  };
  const clientRes = await client
    .post('/clients')
    .loginVia(user)
    .send(clientPayload)
    .end();

  return { user, store, equipment, clientRes };
}

test('it should list no Service Orders', async ({ client }) => {
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSON([]);
});

test('it should list all Service Orders', async ({ client }) => {
  const { user, clientRes, store, equipment } = await generateRelations(client);

  await ServiceOrder.create({
    creator_id: user.id,
    client_id: clientRes.id,
    store_id: store.id,
    equipment_id: equipment.id,
    serial_number: 'abc123',
    equipment_model: 'abc',
    accessories: 'abc',
    os_number: 'A000123',
    os_type: 'type 1',
    problem_description: "problem description 1'",
    observation: 'os observation 1',
    payment_type: 'type 1',
    paid_value: 123,
    warranty: '90 days',
    received_by: 'john doe',
  });
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      serial_number: 'abc123',
      equipment_model: 'abc',
      accessories: 'abc',
      os_number: 'A000123',
      os_type: 'type 1',
      problem_description: "problem description 1'",
      observation: 'os observation 1',
      payment_type: 'type 1',
      paid_value: 123,
      warranty: '90 days',
      received_by: 'john doe',
    },
  ]);
});

test('it should save a new store', async ({ client }) => {
  const { user, clientRes, store, equipment } = await generateRelations(client);

  await ServiceOrder.create({
    creator_id: user.id,
    client_id: clientRes.id,
    store_id: store.id,
    equipment_id: equipment.id,
    serial_number: 'abc123',
    equipment_model: 'abc',
    accessories: 'abc',
    os_number: 'A000123',
    os_type: 'type 1',
    problem_description: "problem description 1'",
    observation: 'os observation 1',
    payment_type: 'type 1',
    paid_value: 123,
    warranty: '90 days',
    received_by: 'john doe',
  });
  const response = await client.get('serviceorders').end();
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      serial_number: 'abc123',
      equipment_model: 'abc',
      accessories: 'abc',
      os_number: 'A000123',
      os_type: 'type 1',
      problem_description: "problem description 1'",
      observation: 'os observation 1',
      payment_type: 'type 1',
      paid_value: 123,
      warranty: '90 days',
      received_by: 'john doe',
    },
  ]);
});

test('it should not save a new store if validation fails', async ({
  client,
}) => {
  const { user } = await generateRelations(client);

  const response = await client
    .post('serviceorders')
    .loginVia(user)
    .send()
    .end();
  response.assertStatus(400);
});

// test alterations when a diagnostic is added etc
