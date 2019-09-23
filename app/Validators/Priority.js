const Antl = use('Antl');

class Priority {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      description: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Priority;
