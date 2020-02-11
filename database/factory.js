/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Equipment', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    brand: faker.string(),
    details: faker.string(),
    obs: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    active: true,
    ...data,
  };
});

Factory.blueprint('App/Models/Store', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    cnpj: '123.123.123-33',
    email: faker.email(),
    phone1: faker.phone(),
    phone2: faker.phone(),
    active: true,
    owner_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/Client', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    last_name: faker.string(),
    cpf: '123.123.123-33',
    gender: 'F',
    email: faker.email(),
    phone1: faker.phone(),
    phone2: faker.phone(),
    active: true,
    ...data,
  };
});

Factory.blueprint('App/Models/System', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    cnpj: '123.123.123-33',
    email: faker.email(),
    information: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    owner_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/Diagnostic', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    obs: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Repair', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    obs: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/ServiceOrder', (faker, i, data = {}) => {
  return {
    serial_number: faker.name(),
    equipment_model: faker.string(),
    accessories: faker.string(),
    os_number: faker.string(),
    os_type: faker.string(),
    problem_description: faker.string(),
    observation: faker.string(),
    payment_type: faker.string(),
    paid_value: '30',
    warranty: faker.string(),
    received_by: faker.name(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    client_id: async () => {
      return (await Factory.model('App/Models/Client').create()).id;
    },
    store_id: async () => {
      if (data.store_id) {
        return data.store_id;
      }
      return (await Factory.model('App/Models/Store').create()).id;
    },
    equipment_id: async () => {
      return (await Factory.model('App/Models/Equipment').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/OsStatus', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/DiagStatus', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/RepairStatus', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/PaymentStatus', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});

Factory.blueprint('App/Models/Priority', (faker, i, data = {}) => {
  return {
    title: faker.string(),
    description: faker.string(),
    creator_id: async () => {
      return (await Factory.model('App/Models/User').create()).id;
    },
    ...data,
  };
});
