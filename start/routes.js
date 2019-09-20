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
// Auth routes
Route.group(() => {
  // Put here all secured routes
}).middleware(['auth'])
