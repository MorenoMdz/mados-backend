const Antl = use('Antl');

class System {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      cnpj: 'required',
      email: 'required',
      owner_id: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = System;
