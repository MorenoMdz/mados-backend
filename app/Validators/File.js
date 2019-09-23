class File {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required',
    };
  }
}

module.exports = File;
