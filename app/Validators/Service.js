const Antl = use('Antl');

class Service {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      client_id: 'required',
      store_id: 'required',
      equipment_id: 'required',
      serial_number: 'required',
      equipment_model: 'required',
      accessories: 'required',
      os_number: 'required',
      os_type: 'required',
      problem_description: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Service;
