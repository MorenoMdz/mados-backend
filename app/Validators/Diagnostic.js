class Diagnostic {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      diag_title: 'required',
      diag_description: 'required',
    };
  }
}

module.exports = Diagnostic;
