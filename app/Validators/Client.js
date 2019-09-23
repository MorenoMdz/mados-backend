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
}

module.exports = Client;
