const Antl = use('Antl');

class File {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = File;
