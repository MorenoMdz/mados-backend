const Antl = use('Antl');

class Repair {
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

module.exports = Repair;
