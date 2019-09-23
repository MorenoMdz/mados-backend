const Antl = use('Antl');
class Address {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      street: 'required',
      number: 'required',
      district: 'required',
      city: 'required',
      state: 'required',
      country: 'required',
      zip: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Address;
