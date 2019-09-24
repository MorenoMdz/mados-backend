const serviceOrderUpdate = (exports = module.exports = {});

const Kue = use('Kue');
const Job = use('App/Jobs/ServiceOrderEmail');

serviceOrderUpdate.sendServiceOrderEmail = async serviceOrderInstance => {
  // check if the status changed to Approved or Denied to send an email

  // gets the user to receive an email, needs to be an operator of the store
  const { email, name } = await serviceOrderInstance.store().fetch();
  const { serviceOrder } = serviceOrderInstance;

  Kue.dispatch(Job.key, { email, name, serviceOrder }, { attempts: 3 });
};
