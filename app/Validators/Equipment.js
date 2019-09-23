const Antl = use('Antl');
class Equipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|unique:equipment',
      brand: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Equipment;
