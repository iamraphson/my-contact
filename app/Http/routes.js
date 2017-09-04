'use strict'
const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('/auth/signin', 'AuthController.showLogin')
Route.post('/auth/signin', 'AuthController.postLogin')
Route.get('/auth/register', 'AuthController.showRegister')
Route.post('/auth/register', 'AuthController.postRegister')
Route.get('/logout', 'AuthController.logout')


Route.group('authenticated', function () {
	Route.get('/contacts', 'ContactController.index')
	Route.get('/contacts/create', 'ContactController.create')
	Route.post('/contacts/create', 'ContactController.store')
	Route.get('/contact/view/:id', 'ContactController.show')
	Route.get('/contact/edit/:id', 'ContactController.edit')
	Route.put('/contact/update/:id', 'ContactController.update')
	Route.get('/contact/delete/:id', 'ContactController.destroy')
}).middleware('auth')