const File = use('App/Models/File');
const Helpers = use('Helpers');

class FileController {
  async index() {
    const files = await File.query().fetch();
    return files;
  }

  async store({ request, response }) {
    try {
      if (!request.file('file')) return;

      const upload = request.file('file', {
        maxSize: '5mb',
        allowedExtensions: ['jpg', 'png', 'jpeg'],
      });
      const fileName = `${Date.now()}.${upload.subtype}`;
      await upload.move(Helpers.tmpPath('uploads'), { name: fileName });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });
      return file;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Upload error' } });
    }
  }

  async show({ params, response }) {
    try {
      const file = await File.findOrFail(params.id);
      return response.download(Helpers.tmpPath(`uploads/${file.file}`));
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'File download error' } });
    }
  }

  // async update () {
  // }

  // async destroy () {
  // }
}

module.exports = FileController;
