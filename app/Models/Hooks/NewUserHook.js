const NewUserHook = (exports = module.exports = {});

const Kue = use('Kue');
const Job = use('App/Jobs/ServiceOrderEmail');

NewUserHook.sendServiceOrderEmail = async userInstance => {
  // check if the status changed to Approved or Denied to send an email

  // gets the user to receive an email, needs to be an operator of the store
  // const user = await userInstance.store().fetch();
  const { username, email } = userInstance;
  // console.log(username, email);

  // Kue.dispatch(Job.key, { email, username }, { attempts: 3 });
};
