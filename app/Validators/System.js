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
}

module.exports = System;
