const File = use('App/Models/File');
const User = use('App/Models/User');
const Helpers = use('Helpers');
const Drive = use('Drive');

class FileController {
  async index() {
    const files = await File.query().fetch();
    return files;
  }

  async store({ request, response, auth }) {
    try {
      await request.multipart
        .file('file', {}, async file => {
          const ContentType = file.headers['content-type'];
          const ACL = 'public-read';
          const Key = `${(Math.random() * 100).toString(32)}-${
            file.clientName
          }`;

          const url = await Drive.put(Key, file.stream, {
            ContentType,
            ACL,
          });

          const dbFile = await File.create({
            file: file.clientName,
            name: Key,
            type: file.type,
            subtype: file.subtype,
            content_type: ContentType,
            file_path: url,
            user_id: auth.user.id,
          });

          const user = await User.findOrFail(auth.user.id);
          await user.load('files');
          const userFiles = user.toJSON().files.map(f => f.id);
          await user.files().sync([...userFiles, dbFile.id]);

          return response.status(200).send({
            success: {
              message: 'File uploaded successfully',
              url,
              id: dbFile.id,
            },
          });
        })
        .process();
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Error while uploading the file',
          err_message: error.message,
        },
      });
    }
  }

  async show({ params, response }) {
    try {
      const file = await File.findByOrFail('id', params.id);
      response.implicitEnd = false;
      response.header('Content-Type', file.content_type);
      const stream = await Drive.getStream(file.name);
      stream.pipe(response.response);
      // return response.download(Helpers.tmpPath(`uploads/${file.file}`));
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'File download error' } });
    }
  }

  // async update () {
  // }

  async destroy({ response, params }) {
    try {
      const file = await File.findByOrFail('id', params.id);
      await Drive.delete(file.name);
      await file.delete();
      return response
        .status(200)
        .send({ success: { message: 'File deleted' } });
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'File deletion error' } });
    }
  }
}

module.exports = FileController;
