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
}

module.exports = Equipment;
