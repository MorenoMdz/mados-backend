const Antl = use('Antl');
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

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Diagnostic;
