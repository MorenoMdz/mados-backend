/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class File extends Model {
  static get computed() {
    return ['url'];
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`;
  }

  user() {
    return this.belongsToMany('App/Models/User').pivotTable('files_users');
  }
}

module.exports = File;
