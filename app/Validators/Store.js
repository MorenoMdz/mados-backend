const Antl = use('Antl');

class Store {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      cnpj: 'required',
      email: 'required',
      phone1: 'required',
      active: 'required',
      owner_id: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Store;
