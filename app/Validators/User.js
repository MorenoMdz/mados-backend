const Antl = use('Antl');

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: 'required|unique:users',
      password: 'required|confirmed',
      email: 'required|unique:users',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = User;
