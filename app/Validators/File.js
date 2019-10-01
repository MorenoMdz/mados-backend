const Antl = use('Antl');

class File {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'file_ext:png,gif,jpg,jpeg,bmp|file_size:5mb|file_types:image',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = File;
