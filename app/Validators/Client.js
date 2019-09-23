const Antl = use('Antl');
class Client {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      last_name: 'required',
      gender: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Client;
