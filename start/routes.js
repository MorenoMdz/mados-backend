'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world from MadOs' }
})
// User & Auth Routes
Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')

// System wide & Admin routes
Route.get('files/:id', 'FileController.show')
Route.post('files', 'FileController.store')
Route.resource('clients', 'ClientController').apiOnly()
Route.resource('equipments', 'EquipmentController').apiOnly()
Route.resource('address', 'AddressController').apiOnly()
Route.resource('diagnostic', 'DiagnosticController').apiOnly()
Route.resource('diagstatus', 'DiagStatusController').apiOnly()
Route.resource('repairstatus', 'RepairStatusController').apiOnly()
Route.resource('osstatus', 'OsStatusController').apiOnly()
Route.resource('paymentstatus', 'PaymentStatusController').apiOnly()
Route.resource('priorities', 'PriorityController').apiOnly()
Route.resource('repairs', 'RepairController').apiOnly()
Route.resource('stores', 'StoreController').apiOnly()
Route.resource('systems', 'SystemController').apiOnly()
Route.resource('serviceorders', 'ServiceOrderController').apiOnly()

// Store locked routes
// TODO

// Auth routes
Route.group(() => {
  // Put here all secured routes
}).middleware(['auth'])
