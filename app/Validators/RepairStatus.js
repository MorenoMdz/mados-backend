const Antl = use('Antl');

class RepairStatus {
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

module.exports = RepairStatus;
