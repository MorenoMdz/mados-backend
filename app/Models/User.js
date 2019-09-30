/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
    // this.addHook('afterSave', 'NewUserHook.sendServiceOrderEmail'); // TODO
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
    ];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  serviceOrder() {
    return this.hasMany('App/Models/ServiceOrder');
  }

  files() {
    return this.belongsToMany('App/Models/File').pivotTable('files_users');
  }
  // files() {
  //   return this.belongsTo('App/Models/File');
  // }

  system() {
    return this.belongsTo('App/Models/System');
  }

  stores() {
    return this.belongsToMany('App/Models/Store').pivotTable('store_users');
  }
}

module.exports = User;
