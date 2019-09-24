const Mail = use('Mail');

class ServiceOrderEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 2;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'ServiceOrderEmail-job';
  }

  // This is where the work is done.
  async handle({ name, email, serviceOrder }) {
    console.log('!! New Email Job: ServiceOrderEmail-job started!!');
    await Mail.send(
      ['emails.so_update'],
      { name, email, serviceOrder },
      message =>
        message
          .to(email)
          .from('admin@mados.tech || Admin MadOs')
          .subject('SO Update')
    );
  }
}

module.exports = ServiceOrderEmail;
