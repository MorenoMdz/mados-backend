'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world from MadOs' }
})

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')
// Files
Route.get('files/:id', 'FileController.show')
Route.post('files', 'FileController.store')
// Clients
Route.resource('clients', 'ClientController').apiOnly()
// Equipments
Route.resource('equipments', 'EquipmentController').apiOnly()
// Addresses
Route.resource('address', 'AddressController').apiOnly()
// Diagnostics
Route.resource('diagnostic', 'DiagnosticController').apiOnly()
// Diagnostic Status
Route.resource('diagstatus', 'DiagStatusController').apiOnly()
// SO Status
Route.resource('repairstatus', 'RepairStatusController').apiOnly()
// SO Status
Route.resource('osstatus', 'OsStatusController').apiOnly()
// Payment Status
Route.resource('paymentstatus', 'PaymentStatusController').apiOnly()
// Priorities
Route.resource('priorities', 'PriorityController').apiOnly()
// Repairs
Route.resource('repairs', 'RepairController').apiOnly()
// Stores
Route.resource('stores', 'StoreController').apiOnly()
// System
Route.resource('systems', 'SystemController').apiOnly()
// Service Order routes
Route.resource('serviceorders', 'ServiceOrderController').apiOnly()
// Auth routes
Route.group(() => {
  // Put here all secured routes
}).middleware(['auth'])
