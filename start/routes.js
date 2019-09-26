const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world from MadOs' };
});
// User, Auth & ACL Routes
Route.get('users', 'UserController.index');
Route.post('users', 'UserController.store').validator('User');
Route.put('users/:id', 'UserController.update').middleware('auth');
// .validator('User') //TODO
Route.post('sessions', 'SessionController.store').validator('Session');
Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.put('forgot', 'ForgotPasswordController.update').validator('Reset');
Route.resource('permissions', 'PermissionController')
  .apiOnly()
  .middleware('auth');
Route.resource('roles', 'RoleController')
  .apiOnly()
  .middleware('auth');

// System wide & Admin routes
Route.resource('clients', 'ClientController')
  .apiOnly()
  .validator([[['clients.store'], ['Client']]]);
Route.resource('diagnostics', 'DiagnosticController')
  .apiOnly()
  .validator([[['diagnostics.store'], ['Diagnostic']]]);
Route.resource('diagstatus', 'DiagStatusController')
  .apiOnly()
  .validator([[['diagstatus.store'], ['DiagStatus']]]);
Route.resource('equipments', 'EquipmentController')
  .apiOnly()
  .validator([[['equipments.store'], ['Equipment']]]);
Route.resource('files', 'FileController')
  .apiOnly()
  .validator([[['files.store'], ['File']]]);
Route.resource('osstatus', 'OsStatusController')
  .apiOnly()
  .validator([[['osstatus.store'], ['OsStatus']]]);
Route.resource('paymentstatus', 'PaymentStatusController')
  .apiOnly()
  .validator([[['paymentstatus.store'], ['PaymentStatus']]]);
Route.resource('priorities', 'PriorityController')
  .apiOnly()
  .validator([[['priorities.store'], ['Priority']]]);
Route.resource('repairs', 'RepairController')
  .apiOnly()
  .validator([[['repairs.store'], ['Repair']]]);
Route.resource('repairstatus', 'RepairStatusController')
  .apiOnly()
  .validator([[['repairstatus.store'], ['RepairStatus']]]);
Route.resource('stores', 'StoreController')
  .apiOnly()
  .validator([[['stores.store'], ['Store']]]);
Route.resource('systems', 'SystemController')
  .apiOnly()
  .validator([[['systems.store'], ['System']]]);
Route.resource('serviceorders', 'ServiceOrderController')
  .apiOnly()
  .validator([[['serviceorders.store'], ['Service']]]);

// Store locked routes
// TODO

// Auth routes
Route.group(() => {
  // Put here all secured routes
  Route.resource('address', 'AddressController')
    .apiOnly()
    .validator([[['address.store'], ['Address']]]);
}).middleware(['auth', 'is:(administrator || moderator']);
